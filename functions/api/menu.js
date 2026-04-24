export async function onRequest(context) {
  const items = await context.env.DB.prepare(
    "SELECT * FROM menu_items WHERE isPublished = 1 ORDER BY category, name"
  ).all();
  const grouped = {};
  for (const item of items.results) {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push({ ...item, isPublished: Boolean(item.isPublished) });
  }
  return Response.json(grouped);
}
