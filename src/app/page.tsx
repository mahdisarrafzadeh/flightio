"use client";
import { useEffect } from "react";
import Tabs from "@/components/tabs";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { retrieveProducts, selectProduct } from "@/redux/slices/product";
import Image from "next/image";
import { Card, Row, Col, Typography, Space } from "antd";
import { useRouter } from "next/navigation";

const tabItems = ["ارزان‌ترین", "گران‌‌ترین"];

export default function Home() {
  const [activeKey, setActiveKey] = useState<string | undefined>(tabItems[0]);
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(selectProduct);
  const router = useRouter();

  useEffect(() => {
    dispatch(retrieveProducts());
  }, []);

  return (
    <main>
      <Row className="w-full" gutter={[25, 25]}>
        <Col xs={24}>
          <section className="bg-white flex justify-start px-3 py-2 rounded-lg border-[1px] border-solid min-h-[56px] ">
            <Tabs
              items={tabItems}
              setActiveKey={setActiveKey}
              activeKey={activeKey}
            />
          </section>
        </Col>
        <Col xs={24}>
          <section className="w-full">
            <Row gutter={[20, 20]}>
              {products?.map(({ id, image, title, rating, price }) => (
                <Col key={id} xs={24} sm={24} md={12} lg={8} xl={6}>
                  <Card
                    className="text-left rounded-lg  cursor-pointer bg-white border-1 border-[#E0E0E0] border-solid "
                    cover={
                      <Image
                        src={image || ""}
                        alt={title || ""}
                        width={213}
                        height={240}
                        className="w-[213px] h-[240px] object-contain pt-6 pb-[26px] px-[50px]"
                      />
                    }
                    onClick={() => router.push(`/${id}`)}
                  >
                    <Typography.Text className="font-bold h-11 text-base overflow-hidden line-clamp-2">
                      {title}
                    </Typography.Text>
                    <div className="flex justify-between items-center mt-[17px] ">
                      <Space size={4}>
                        <Image
                          src="/kid_star.svg"
                          alt="rating"
                          width={24}
                          height={24}
                          priority
                        />
                        <span className="text-default-gray font-medium text-sm">
                          {rating?.rate}
                        </span>
                      </Space>
                      <Space
                        size={4}
                        className="text-default-blue text-lg font-bold"
                      >
                        {price}تومان
                      </Space>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </section>
        </Col>
      </Row>
    </main>
  );
}
