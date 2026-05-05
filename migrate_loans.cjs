const { createClient } = require('@supabase/supabase-js');

const supabase = createClient('https://themmfvguljvhyyvehhh.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRoZW1tZnZndWxqdmh5eXZlaGhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4ODE4MDUsImV4cCI6MjA5MzQ1NzgwNX0.rfni0zFgw1vRBBuM_ipR0En87uhTa31HFR-mpA5y2Ic');

const services = [
  {
    title: 'Personal Loan',
    slug: 'personal-loan',
    desc: 'Achieve your personal goals with our swift and transparent personal loan solutions.',
    icon_name: 'Banknote',
    image_url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2070',
    features: ['Instant approval for all profiles', 'Loan amount up to ₹40 Lakhs', 'No collateral required', 'Rates starting from 7.5%', 'Tenure up to 60 months'],
    display_order: 0
  },
  {
    title: 'Business Loan',
    slug: 'business-loan',
    desc: 'Empower your enterprise with strategic capital. We provide high-value business loans.',
    icon_name: 'Building2',
    image_url: 'https://raw.githubusercontent.com/gouravboga12-rgb/Kruthik-finacial-services-/main/src/assets/images/Businessloan2.png',
    features: ['Funding for expansion & capital', 'No collateral for select limits', 'Quick 48-hour disbursement', 'Special schemes for entrepreneurs', 'Flexible repayment options'],
    display_order: 1
  },
  {
    title: 'Home Loan',
    slug: 'home-loan',
    desc: 'Acquire your dream property with the market\'s lowest interest rates.',
    icon_name: 'HomeIcon',
    image_url: 'https://raw.githubusercontent.com/gouravboga12-rgb/Kruthik-finacial-services-/main/src/assets/images/Homeloan.png',
    features: ['Rates starting from 7.5%', 'Doorstep document collection', 'Simplified approval process', 'Balance transfer with top-up', 'Tenure up to 30 years'],
    display_order: 2
  },
  {
    title: 'Project Loan',
    slug: 'project-loan',
    desc: 'Specialized funding for large-scale industrial and commercial developments.',
    icon_name: 'Zap',
    image_url: 'https://raw.githubusercontent.com/gouravboga12-rgb/Kruthik-finacial-services-/main/src/assets/images/Projectloan.png',
    features: ['Tailored infrastructure funding', 'Expert project evaluation', 'Repayment aligned with cash flow', 'Greenfield & Brownfield projects', 'Large-scale financing terms'],
    display_order: 3
  },
  {
    title: 'Loan Against Property',
    slug: 'loan-against-property',
    desc: 'Unlock the idle value of your property. Get maximum liquidity while retaining ownership.',
    icon_name: 'ShieldCheck',
    image_url: 'https://raw.githubusercontent.com/gouravboga12-rgb/Kruthik-finacial-services-/main/src/assets/images/LoanAgainstProperty.png',
    features: ['High LTV ratio up to 70%', 'Residential & Commercial property', 'Lower rates than personal loans', 'Long tenure for easy repayment', 'Funds for any business need'],
    display_order: 4
  },
  {
    title: 'Loan Takeover / BT',
    slug: 'loan-takeover',
    desc: 'Transfer your high-interest existing loans and save on monthly EMIs.',
    icon_name: 'RefreshCw',
    image_url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2070',
    features: ['Reduce interest rates significantly', 'No hidden transfer charges', 'Additional top-up available', 'Consolidate multiple EMIs', 'Minimal transfer paperwork'],
    display_order: 5
  }
];

async function seed() {
  console.log('--- Starting Migration ---');
  for (const s of services) {
    const { data, error } = await supabase.from('loan_services').upsert(
      { title: s.title, slug: s.slug, description: s.desc, icon_name: s.icon_name, image_url: s.image_url, features: s.features, display_order: s.display_order },
      { onConflict: 'slug' }
    ).select();
    
    if (error) {
      console.error('FAILED: ' + s.title + ' -> ' + error.message);
    } else {
      console.log('SUCCESS: ' + s.title);
      
      const serviceId = data[0].id;
      const defaultFields = [
        { label: 'Full Name', field_name: 'name', field_type: 'text', placeholder: 'Legal Name', is_required: true, display_order: 0 },
        { label: 'Phone Number', field_name: 'phone', field_type: 'tel', placeholder: '10 Digits', is_required: true, display_order: 1 },
        { label: 'Email Address', field_name: 'email', field_type: 'email', placeholder: 'official@email.com', is_required: true, display_order: 2 },
        { label: 'Loan Requirement', field_name: 'requirement', field_type: 'number', placeholder: 'Loan Amount', is_required: true, display_order: 3 }
      ];
      
      if (s.title === 'Personal Loan' || s.title === 'Business Loan') {
        defaultFields.push({ label: 'Monthly Income', field_name: 'income', field_type: 'number', placeholder: 'Monthly Salary', is_required: true, display_order: 4 });
        defaultFields.push({ label: 'Age', field_name: 'age', field_type: 'number', placeholder: '18+', is_required: true, display_order: 5 });
        defaultFields.push({ label: 'CIBIL Score', field_name: 'cibil', field_type: 'number', placeholder: '300-900', is_required: true, display_order: 6 });
      }

      await supabase.from('loan_service_fields').delete().eq('service_id', serviceId);
      const { error: fieldErr } = await supabase.from('loan_service_fields').insert(
        defaultFields.map(f => ({ ...f, service_id: serviceId }))
      );
      if (fieldErr) console.error('FIELD ERROR for ' + s.title + ':', fieldErr.message);
    }
  }
  console.log('--- Migration Finished Successfully ---');
}

seed();
