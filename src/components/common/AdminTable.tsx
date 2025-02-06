import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaEye } from 'react-icons/fa';
import { postApi } from '../services/api';
import DeleteModal from '../common/modal/DeleteModal';
import TablePagination from '../common/TablePagination';

const TableContainer = styled.div`
  background-color: #FAF5EB;
  border-radius: 4px;
  box-shadow: none;
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #FAF5EB;
`;

const TableHeader = styled.th`
  padding: 12px 16px;
  text-align: left;
  background-color: #f7d38a;
  border-bottom: 1px solid #f7d38a;
  color: #495057;
  font-weight: 500;
  font-size: 14px;
`;

const TableCell = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #f7d38a;
  color: #212529;
  font-size: 14px;
  vertical-align: middle;
`;

const DoctorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const DoctorImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DoctorDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const DoctorName = styled.a`
  color: #62B162;
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 4px;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

const DoctorType = styled.div`
  font-size: 12px;
  color: #6C757D;
`;

const TypeBadge = styled.span`
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background-color: #E3F2FD;
  color: #0D47A1;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #62B162;
  cursor: pointer;
  padding: 4px;
  font-size: 16px;

  &:hover {
    color: #0A58CA;
  }
`;

interface AdminTableProps {
  searchQuery: string;
}

const AdminTable: React.FC<AdminTableProps> = ({ searchQuery }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [doctorList, setDoctorList] = useState<any>([]);
  const navigate = useNavigate();

  const totalItems = doctorList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedItems = doctorList
    .filter((item: any) =>
      item.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.specialization.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(startIndex, endIndex);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await postApi('hospital/doctor/list', {});
        if (response.status === 200) {
          setDoctorList(response.data.data.doctor);
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <TableContainer>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <TableHeader>Doctor</TableHeader>
              <TableHeader>SPECIALIST</TableHeader>
              <TableHeader>DEPARTMENT</TableHeader>
              <TableHeader>TYPE</TableHeader>
              <TableHeader>Action</TableHeader>
            </tr>
          </thead>
          <tbody>
            {displayedItems.map((item: any, index: number) => (
              <tr key={index}>
                <TableCell>
                  <DoctorInfo>
                    <DoctorImage>
                      <img
                        src={
                          item.image ||
                          'https://img.freepik.com/free-vector/doctor-medical-healthcare-pfrofessional-character-vector_53876-175176.jpg'
                        }
                        alt={`${item.firstName} ${item.lastName}`}
                      />
                    </DoctorImage>
                    <DoctorDetails>
                      <DoctorName 
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/doctor/${item._id}`, { state: { item } });
                        }}
                      >
                        {item.firstName} {item.lastName}
                      </DoctorName>
                      <DoctorType>{item.specialization.toUpperCase()}</DoctorType>
                    </DoctorDetails>
                  </DoctorInfo>
                </TableCell>
                <TableCell>{item.specialization}</TableCell>
                <TableCell>{item.department}</TableCell>
                <TableCell>
                  <TypeBadge>{item.type}</TypeBadge>
                </TableCell>
                <TableCell>
                  <ActionButton
                    onClick={() => navigate(`/doctor/${item._id}`, { state: { item } })}
                    title="View Details"
                  >
                    <FaEye />
                  </ActionButton>
                </TableCell>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        startIndex={startIndex}
        endIndex={endIndex}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />

      {showDeleteModal && (
        <DeleteModal
          onDelete={handleConfirmDelete}
          onClose={handleCloseDeleteModal}
        />
      )}
    </TableContainer>
  );
};

export default AdminTable;