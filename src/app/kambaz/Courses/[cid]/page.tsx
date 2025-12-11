import { redirect } from "next/navigation";
export default async function coursespage({ params }: { params: Promise<{ cid: string }> }) {
    const { cid } = await params;
    redirect(`/Courses/${cid}/home`);
}