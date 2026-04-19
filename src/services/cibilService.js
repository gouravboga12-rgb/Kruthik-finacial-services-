// ============================================================
// CIBIL Service — Kruthik Financial Services
// ============================================================
// MOCK_MODE = true  → Simulated responses (current state)
// MOCK_MODE = false → Live FinBox BureauConnect API
// To go live: set MOCK_MODE = false and add your FinBox
// API key to .env as VITE_FINBOX_API_KEY
// ============================================================

const MOCK_MODE = true; // ← flip to false when FinBox account is ready
const MOCK_OTP = '123456';

// Deterministic score generator — same PAN always gives same score
// This makes the demo feel realistic and consistent
const getMockScore = (pan) => {
  let hash = 0;
  const str = pan.toUpperCase();
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32-bit int
  }
  // Realistic CIBIL range: 650–850
  return 650 + (Math.abs(hash) % 201);
};

// ─────────────────────────────────────────
// Step 1: Initiate CIBIL Check
// Returns a requestId for the OTP step
// ─────────────────────────────────────────
export const initiateCibilCheck = async ({ name, pan, mobile, dob }) => {
  if (MOCK_MODE) {
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 2200));

    return {
      success: true,
      requestId: `KFS-MOCK-${Date.now()}`,
      message: 'OTP dispatched to registered mobile',
    };
  }

  // ── REAL FinBox API (uncomment when keys are ready) ──
  // const response = await fetch('https://apis.finbox.in/bureau/v1/initiate', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'x-api-key': import.meta.env.VITE_FINBOX_API_KEY,
  //   },
  //   body: JSON.stringify({ name, pan, mobile, dob }),
  // });
  // if (!response.ok) throw new Error('INITIATION_FAILED');
  // return response.json();
};

// ─────────────────────────────────────────
// Step 2: Verify OTP & Fetch Real Score
// Returns the exact CIBIL score + report
// ─────────────────────────────────────────
export const verifyCibilOtp = async ({ requestId, otp, pan }) => {
  if (MOCK_MODE) {
    await new Promise((resolve) => setTimeout(resolve, 1800));

    if (otp !== MOCK_OTP) {
      const error = new Error('INVALID_OTP');
      error.code = 'INVALID_OTP';
      throw error;
    }

    const score = getMockScore(pan);
    let tier, advice;

    if (score >= 800) {
      tier = 'Elite';
      advice = 'You qualify for our lowest 8.25% interest rate tier.';
    } else if (score >= 750) {
      tier = 'Good';
      advice = 'You qualify for competitive rates. Apply now for priority processing.';
    } else if (score >= 700) {
      tier = 'Standard';
      advice = 'Your profile qualifies for a loan. A co-applicant can improve your rate.';
    } else {
      tier = 'Needs Improvement';
      advice = 'We can still help. Contact our advisors for a tailored solution.';
    }

    return {
      success: true,
      score,
      tier,
      advice,
      bureau: 'TransUnion CIBIL',
      reportDate: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
      pan: pan.slice(0, 5) + '****' + pan.slice(-1), // Masked PAN
    };
  }

  // ── REAL FinBox OTP Verify (uncomment when keys are ready) ──
  // const response = await fetch('https://apis.finbox.in/bureau/v1/verify-otp', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'x-api-key': import.meta.env.VITE_FINBOX_API_KEY,
  //   },
  //   body: JSON.stringify({ requestId, otp }),
  // });
  // if (!response.ok) {
  //   const err = await response.json();
  //   const error = new Error(err.error_code || 'VERIFICATION_FAILED');
  //   error.code = err.error_code;
  //   throw error;
  // }
  // return response.json();
};
