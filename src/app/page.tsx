"use client";
import { useEffect } from "react";
import Tabs from "@/components/tabs";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { retrieveTutorials, selectProduct } from "@/redux/slices/product";
import Image from "next/image";
import { Card, Row, Col, Typography } from "antd";

const tabItems = ["ارزان‌ترین", "گران‌‌ترین"];

export default function Home() {
  const [activeKey, setActiveKey] = useState<string | undefined>(tabItems[0]);
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(selectProduct);

  useEffect(() => {
    dispatch(retrieveTutorials());
  }, []);

  return (
    <main className="flex flex-col items-center justify-between px-[60px] pt-11">
      <section className="bg-white w-full flex justify-start px-3 py-2 rounded-lg border-[1px] border-solid min-h-[56px] ">
        <Tabs
          items={tabItems}
          setActiveKey={setActiveKey}
          activeKey={activeKey}
        />
      </section>
      <section className="w-full">
        <Row gutter={[20, 20]}>
          {products?.map((item) => (
            <Col key={item.id} xs={24} sm={24} md={12} lg={8} xl={6}>
              <Card
                className="text-left rounded-lg  bg-white border-1 border-[#E0E0E0] border-solid "
                cover={
                  <Image
                    src={item.image || ""}
                    alt={item.title || ""}
                    width={213}
                    height={240}
                    className="w-[213px] h-[240px] object-contain pt-6 pb-[26px] px-[50px]"
                  />
                }
                bodyStyle={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  minHeight: "180px",
                }}
              >
                <Typography.Text className="font-bold text-base overflow-hidden ">
                  {item.title}
                </Typography.Text>
                <div className="flex justify-between items-center">
                  <span>{item.rating?.rate}</span>
                  <span>{item.price}تومان</span>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </main>
  );
}
