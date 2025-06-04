import React, { useEffect, useMemo, useRef, useState } from "react";
import AdminUirender from "../../../Authentications_role/Admin/AdminUiRender";
import { SidebarCon } from "../../../Authentications_role/Admin/AdminDashboard";
import { productAxios } from "../../../AuthAxios/Auth";
import styled, { keyframes } from "styled-components";
import { debounce } from "lodash";
// import Spinner from 'react-bootstrap/Spinner';
const ViewProduct = () => {
  return (
    <AdminUirender>
      <SidebarCon>
        <Viewdata />
      </SidebarCon>
    </AdminUirender>
  );
};

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled components
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  animation: ${pulse} 1.5s infinite;
`;

const LoadingText = styled.h1`
  color: #4a4a4a;
  font-size: 2rem;
`;

const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-out;
  overflow: hidden;
  border-radius: 8px;

  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
  }
`;

const TableHeader = styled.thead`
  background-color: #3f51b5;
  color: white;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f5f5f5;
  }

  &:hover {
    background-color: #e8eaf6;
    transition: background-color 0.3s ease;
  }
`;

const TableCell = styled.td`
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  vertical-align: middle;
  will-change: transform;
  backface-visibility: hidden;
  @media (max-width: 600px) {
    padding: 8px 10px;
    font-size: 0.9rem;
  }
`;

const TableHeaderCell = styled.th`
  padding: 12px 15px;
  text-align: left;

  @media (max-width: 600px) {
    padding: 8px 10px;
    font-size: 0.9rem;
  }
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
  margin: 5px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
    z-index: 10;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 600px) {
    width: 50px;
    height: 50px;
  }
`;

const SideImagesContainer = styled.div`
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  gap: 5px;
  padding: 5px 0;
  max-width: 100%;
  scrollbar-width: thin;
  scrollbar-color: #3f51b5 #f5f5f5;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #3f51b5;
    border-radius: 6px;
  }

  @media (max-width: 600px) {
    max-width: 200px;
  }
`;

function Viewdata() {
  const [fullData, setFullData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
const tableRef = useRef(null);
  function ProductDataGetMethod() {
    setIsLoading(true);
    productAxios
      .get("/ProductRead")
      .then((res) => {
        console.log(res.data.Productdata);
        setFullData(res.data.Productdata);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }
const handleResize = debounce((entries) => {
  requestAnimationFrame(() => {
    for (let entry of entries) {
      console.log("Resize observed:", entry.target);
      // Avoid DOM manipulation here
    }
  });
}, 100);


  useEffect(() => {
  const observer = new ResizeObserver(handleResize);

  if (tableRef.current) {
    observer.observe(tableRef.current);
  }

  return () => {
    observer.disconnect();
    handleResize.cancel();
  };
}, []);

  const handleDoubleClick = useMemo(() => debounce((rowData) => {
  // Your double-click logic here
}, 300), []);
  useEffect(() => {
    ProductDataGetMethod();
  }, []);

  return (
    <div>
      {isLoading ? (
        <LoadingContainer>
          <LoadingText>Loading... </LoadingText>
        </LoadingContainer>
      ) : (
        <ProductTable ref={tableRef}>
          <TableHeader>
            <tr>
              <TableHeaderCell>No</TableHeaderCell>
              <TableHeaderCell>Title</TableHeaderCell>
              <TableHeaderCell>Image</TableHeaderCell>
              <TableHeaderCell>Price</TableHeaderCell>
              <TableHeaderCell>Stock</TableHeaderCell>
              <TableHeaderCell>Quantity</TableHeaderCell>
              <TableHeaderCell>Side Images</TableHeaderCell>
            </tr>
          </TableHeader>
          <tbody>
            {fullData?.map((item, index) => {
              let {
                price,
                productstock,
                quantity,
                singleimg,
                title,
                multiimg,
              } = item;

              let splitImg = singleimg.split(
                "R:\\react\\addTocart\\frontend\\src\\cartImage\\"
              )[1];

              return (
                <TableRow key={index}  onDoubleClick={() => handleDoubleClick(item)}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{title}</TableCell>
                  <TableCell>
                    <ProductImage
                      src={require(`../../../cartImage/${splitImg}`)}
                      alt={title}
                    />
                  </TableCell>
                  <TableCell> ₹{price}</TableCell>
                  <TableCell>{productstock}</TableCell>
                  <TableCell>{quantity}</TableCell>
                  <TableCell>
                    <SideImagesContainer>
                      {multiimg.map((imgPath, ind) => {
                        let splitimgPath = imgPath.split(
                          "R:\\react\\addTocart\\frontend\\src\\cartImage\\"
                        )[1];
                        return (
                          <ProductImage
                            key={ind}
                            src={require(`../../../cartImage/${splitimgPath}`)}
                            alt={`${title} side ${ind + 1}`}
                          />
                        );
                      })}
                    </SideImagesContainer>
                  </TableCell>
                </TableRow>
              );
            })}
          </tbody>
        </ProductTable>
      )}
    </div>
  );
}

export default ViewProduct;
