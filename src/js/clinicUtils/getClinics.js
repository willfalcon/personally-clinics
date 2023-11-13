export default async function getClinics(query) {
  const url = new URL(`${window.location.origin}/wp-json/clinic-finder/v2/get-clinics`);
  const clinics = await fetch(url.href, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  }).then(res => res.json());
  return clinics;
}
