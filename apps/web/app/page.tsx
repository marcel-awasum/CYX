const modules = [
  'Dashboard', 'Entities', 'KYC Queue', 'Risk Tiering', 'Pricing Bands', 'Mandates/Matching', 'Deals (CYXAssets)', 'Monitoring', 'Billing', 'Audit Logs'
];

export default function HomePage() {
  return (
    <main style={{ fontFamily: 'sans-serif', padding: 24 }}>
      <h1>CYX + CYXAssets Console</h1>
      <p>Institutional capital routing + asset structuring platform (admin/ops/investor/bank views).</p>
      <h2>Module Coverage</h2>
      <ul>{modules.map((m) => <li key={m}>{m}</li>)}</ul>
      <h2>Demo Flow</h2>
      <ol>
        <li>Onboard bank and run KYC workflow.</li>
        <li>Run risk-tiering and pricing computation.</li>
        <li>Create mandate, match capital request, and allocate.</li>
        <li>Generate monitoring tasks and invoice fee lines.</li>
        <li>Intake CYXAssets deal, distribute IOIs, and execute close.</li>
      </ol>
    </main>
  );
}
