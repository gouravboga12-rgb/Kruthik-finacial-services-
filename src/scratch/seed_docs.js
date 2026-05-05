import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { fileURLToPath } from 'url';

import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Manually parse .env
const envPath = path.resolve(__dirname, '../../.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) env[key.trim()] = value.trim();
});

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedDocumentFields() {
  try {
    // 1. Get all services
    const { data: services, error: sError } = await supabase.from('loan_services').select('id, title');
    if (sError) throw sError;

    console.log(`Found ${services.length} services. Updating fields...`);

    for (const service of services) {
      console.log(`Processing: ${service.title} (${service.id})`);
      
      // Get current max display order
      const { data: currentFields, error: fError } = await supabase
        .from('loan_service_fields')
        .select('display_order, field_name')
        .eq('service_id', service.id);
      
      if (fError) throw fError;

      const existingFieldNames = currentFields.map(f => f.field_name);
      let maxOrder = currentFields.reduce((max, f) => Math.max(max, f.display_order), -1);

      const docsToAdd = [
        { label: "Aadhaar Card", field_name: "aadhaar", field_type: "file", placeholder: "Front & Back Copy", is_required: true },
        { label: "PAN Card", field_name: "pan", field_type: "file", placeholder: "Clear Photo", is_required: true },
        { label: "Bank Statement", field_name: "bank_statement", field_type: "file", placeholder: "Latest 3 Months PDF", is_required: true },
      ];

      // Add ITR for non-personal loans
      if (service.title.toLowerCase() !== 'personal loan') {
        docsToAdd.push({ label: "ITR Documents", field_name: "itr", field_type: "file", placeholder: "Latest 2 Years", is_required: true });
      }

      const toInsert = [];
      for (const doc of docsToAdd) {
        if (!existingFieldNames.includes(doc.field_name)) {
          maxOrder++;
          toInsert.push({
            service_id: service.id,
            ...doc,
            display_order: maxOrder
          });
        }
      }

      if (toInsert.length > 0) {
        const { error: iError } = await supabase.from('loan_service_fields').insert(toInsert);
        if (iError) console.error(`Error inserting fields for ${service.title}:`, iError);
        else console.log(`Added ${toInsert.length} fields to ${service.title}`);
      } else {
        console.log(`No new fields needed for ${service.title}`);
      }
    }

    console.log("Seeding complete!");
  } catch (err) {
    console.error("Fatal error:", err);
  }
}

seedDocumentFields();
