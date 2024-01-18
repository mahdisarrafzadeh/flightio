import type { Metadata, ResolvingMetadata } from "next";
import axiosBase from "@/services/api";

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;
  const product = await axiosBase
    .get(`/products/${id}`)
    .then((res) => res.data);
  return {
    title: product?.title,
    description: product?.description,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
