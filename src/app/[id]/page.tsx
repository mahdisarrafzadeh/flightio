"use client";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { retrieveProductById, selectProduct } from "@/redux/slices/product";
import React, { useEffect, FC } from "react";
import { Card, Row, Col, Typography, Flex, Space, Divider, Button } from "antd";
import Image from "next/image";

const string = {
  count: " تا باقی مانده ",
};

type Props = {
  params: { id: number };
};

const ProductPage: FC<Props> = ({ params }) => {
  const dispatch = useAppDispatch();
  const { productDetail, status } = useAppSelector(selectProduct);

  useEffect(() => {
    if (params.id) dispatch(retrieveProductById(params.id));
  }, [params.id]);

  return (
    <Card className="!rounded-[20px]" bodyStyle={{ padding: 0 }}>
      <Row>
        <Col
          xs={6}
          className="relative border-solid border-l justify-center items-center h-full py-[50px] px-[72px]"
        >
          <div className="absolute top-5 right-5">
            <div className="flex flex-row border rounded-[50px] ">
              <Space
                size={4}
                className="py-3 px-[10px] border-l cursor-pointer"
              >
                <Image
                  src="/edit.svg"
                  alt="rating"
                  width={16}
                  height={16}
                  priority
                />
                <span className="text-[#1A43D3] text-xs font-medium ">
                  ویرایش
                </span>
              </Space>
              <Space size={4} className="py-3 px-[10px] cursor-pointer">
                <Image
                  src="/delete.svg"
                  alt="rating"
                  width={16}
                  height={16}
                  priority
                />
                <div className="text-[#B02626] text-xs font-medium">
                  حذف محصول
                </div>
              </Space>
            </div>
          </div>
          <Image
            src={productDetail?.image || ""}
            alt={productDetail?.title || ""}
            width={213}
            height={240}
            className="w-[400px] h-[400px] object-contain pt-6 pb-[26px] "
          />
        </Col>
        <Col className="flex flex-col justify-between" xs={18}>
          <Row gutter={[0, 16]} className="w-full pt-10  h-full">
            <Col className=" px-5" xs={24}>
              <Flex className="border-b mb-4" justify="end" vertical>
                <Typography.Title level={4}>
                  {productDetail?.title}
                </Typography.Title>
                <Space
                  className="py-4"
                  size={12}
                  split={
                    <Divider type="vertical" className="h-16 bg-[#E0E0E0]" />
                  }
                  align="start"
                >
                  <Flex justify="center" align="center">
                    <Image
                      src="/kid_star.svg"
                      alt="rating"
                      width={24}
                      height={24}
                      priority
                    />
                    <span className="text-default-gray font-normal text-xs pr-2">
                      {productDetail?.rating?.rate}
                    </span>
                  </Flex>
                  <span className="text-default-gray font-normal text-xs">
                    {productDetail?.rating?.count &&
                      `${productDetail?.rating?.count + string.count}`}
                  </span>
                </Space>
              </Flex>
              <Typography.Text>{productDetail?.description}</Typography.Text>
            </Col>
            <Col className="border-t mt-28 px-5" xs={24}>
              <Row className="h-full items-center">
                <Col xs={12}>
                  <div className="flex justify-start">
                    <span className="text-default-gray text-xs font-medium">
                      مبلغ قابل پرداخت:
                    </span>
                  </div>
                </Col>
                <Col xs={12}>
                  <div className="flex justify-end">
                    <Space
                      size={4}
                      className="text-default-blue text-lg font-bold"
                    >
                      {productDetail?.price}تومان
                    </Space>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default ProductPage;
