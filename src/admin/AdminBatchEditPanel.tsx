/* eslint-disable indent */
/* eslint-disable quotes */
import { getUniqueTagsCached } from "@/photo/cache";
import AdminBatchEditPanelClient from "./AdminBatchEditPanelClient";

export default async function AdminBatchEditPanel() {
    const uniqueTags = await getUniqueTagsCached().catch(() => []);
    return <AdminBatchEditPanelClient {...{ uniqueTags }} />;
}
