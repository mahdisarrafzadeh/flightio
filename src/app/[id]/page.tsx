"use client";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { retrieveProductById, selectProduct } from "@/redux/slices/product";
import React, { useEffect, FC } from "react";
import { Card, Row, Col, Typography, Flex, Space, Divider } from "antd";
import Image from "next/image";
import Confirm from "@/components/confirm/Confirm";
import { useRouter } from "next/navigation";
import EditProduct from "@/components/edit-product/EditProduct";

const string = {
  count: " تا باقی مانده ",
  edit: "ویرایش",
  delete: " حذف محصول",
};

type Props = {
  params: { id: number };
};

const ProductPage: FC<Props> = ({ params }) => {
  const dispatch = useAppDispatch();
  const { productDetail } = useAppSelector(selectProduct);
  const router = useRouter();

  useEffect(() => {
    if (params.id) dispatch(retrieveProductById(params.id));
  }, [params.id]);

  const handleConfirmModal = () => {
    router.push(`/${productDetail?.id}/?modal=true`);
  };
  const handleEditModal = () => {
    router.push(`/${productDetail?.id}/?edit=true`);
  };

  return (
    <>
      <Card className="!rounded-[20px]" bodyStyle={{ padding: 0 }}>
        <Row>
          <Col
            xs={6}
            className="relative border-solid border-l justify-center items-center h-full py-[50px] px-[72px]"
          >
            <div className="absolute top-5 right-5">
              <div className="flex flex-row border rounded-[50px] bg-[#FFF] ">
                <Space
                  size={4}
                  className="py-1 px-[10px] border-l cursor-pointer"
                  align="end"
                  onClick={() => handleEditModal()}
                >
                  <Image
                    src="/edit.svg"
                    alt="rating"
                    width={16}
                    height={16}
                    className="h-auto w-auto"
                  />
                  <span className="text-[#1A43D3] text-xs font-medium ">
                    {string.edit}
                  </span>
                </Space>
                <Space
                  onClick={() => handleConfirmModal()}
                  size={4}
                  className="py-1 px-[10px] cursor-pointer"
                >
                  <Image
                    src="/delete.svg"
                    alt="rating"
                    width={16}
                    height={16}
                    priority
                    className="h-auto w-auto"
                  />

                  <div className="text-[#B02626] text-xs font-medium">
                    {string.delete}
                  </div>
                </Space>
              </div>
            </div>
            <div className="flex h-[400px] object-contain pt-6 pb-[26px] items-center ">
              {productDetail?.image && productDetail?.title && (
                <Image
                  src={productDetail?.image}
                  alt={productDetail?.title}
                  width={213}
                  height={240}
                  loading="lazy"
                />
              )}
            </div>
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
                        className="h-auto w-auto"
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
      <Confirm productId={productDetail?.id} />
      <EditProduct productDetail={productDetail} />
    </>
  );
};

export default ProductPage;
