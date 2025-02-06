import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const PageWrapper = styled.div`
  background-color: #FAF5EB;
  min-height: 100vh;
  padding: 20px;
`;

const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  color: #212529;
  margin: 0;
`;

const BackButton = styled.button`
  background-color: transparent;
  border: 2px solid #62B162;
  color: #62B162;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #62B162;
    color: white;
  }
`;

const CardWrapper = styled.div`
  background-color: #FAF5EB;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  margin-bottom: 20px;
  border: 1px solid #f7d38a;

  padding: 20px;
`;

const DetailRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  color: #8C8A84;
  font-size: 0.9rem;
  margin-bottom: 5px;
`;

const Value = styled.span`
  color: #212529;
  font-size: 1rem;
  font-weight: 500;
`;

const StatusBadge = styled.div`
  display: inline-block;
  background-color: #e6f4ea;
  color: #34a853;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const SectionTitle = styled.h4`
  color: #212529;
  margin: 20px 0;
  font-size: 1.2rem;
`;

const DoctorDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { item } = location.state;

  const renderValue = (value: any) => {
    return value ? value : "N/A";
  };

  return (
    <PageWrapper>
      <ContentHeader>
        <PageTitle>Doctor Details</PageTitle>
        <BackButton onClick={() => navigate("/doctor")}>
          Back
        </BackButton>
      </ContentHeader>

      <CardWrapper>
        <DetailRow>
          <DetailItem>
            <Label>Doctor:</Label>
            <Value>{renderValue(item.firstName)} {renderValue(item.lastName)}</Value>
          </DetailItem>

          <DetailItem>
            <Label>Email:</Label>
            <Value>{renderValue(item.email)}</Value>
          </DetailItem>

          <DetailItem>
            <Label>Phone:</Label>
            <Value>{renderValue(item.mobileNumber)}</Value>
          </DetailItem>

          <DetailItem>
            <Label>Designation:</Label>
            <Value>{renderValue(item.qualification)}</Value>
          </DetailItem>

          <DetailItem>
            <Label>Department:</Label>
            <Value>{renderValue(item.department)}</Value>
          </DetailItem>

          <DetailItem>
            <Label>Qualification:</Label>
            <Value>{renderValue(item.qualification)}</Value>
          </DetailItem>

          <DetailItem>
            <Label>Date of Birth:</Label>
            <Value>{renderValue(item.dob)}</Value>
          </DetailItem>

          <DetailItem>
            <Label>Specialist:</Label>
            <Value>{renderValue(item.specialization)}</Value>
          </DetailItem>

          <DetailItem>
            <Label>Status:</Label>
            <Value>
              <StatusBadge>{item.type}</StatusBadge>
            </Value>
          </DetailItem>

          <DetailItem>
            <Label>Registration No:</Label>
            <Value>{renderValue(item.registrationNo)}</Value>
          </DetailItem>

          <DetailItem>
            <Label>Pan Card:</Label>
            <Value>{renderValue(item.pancard)}</Value>
          </DetailItem>

          <DetailItem>
            <Label>Aadhar No:</Label>
            <Value>{renderValue(item.aadharNo)}</Value>
          </DetailItem>

          <DetailItem>
            <Label>Wedding:</Label>
            <Value>{renderValue(item.wedding)}</Value>
          </DetailItem>

          <DetailItem>
            <Label>Appointment Charge:</Label>
            <Value>{renderValue(item.appointmentCharge)}</Value>
          </DetailItem>
        </DetailRow>
      </CardWrapper>

      <SectionTitle>Clinic Details</SectionTitle>
      <CardWrapper>
        <DetailRow>
          <DetailItem>
            <Label>Clinic Name:</Label>
            <Value>{renderValue(item.clinicDetails?.cName)}</Value>
          </DetailItem>

          <DetailItem>
            <Label>Clinic Address:</Label>
            <Value>{renderValue(item.clinicDetails?.address)}</Value>
          </DetailItem>

          <DetailItem>
            <Label>Clinic Area:</Label>
            <Value>{renderValue(item.clinicDetails?.area)}</Value>
          </DetailItem>

          <DetailItem>
            <Label>Clinic City:</Label>
            <Value>{renderValue(item.clinicDetails?.city)}</Value>
          </DetailItem>

          <DetailItem>
            <Label>Clinic Pin:</Label>
            <Value>{renderValue(item.clinicDetails?.pin)}</Value>
          </DetailItem>

          <DetailItem>
            <Label>Clinic Country:</Label>
            <Value>{renderValue(item.clinicDetails?.country)}</Value>
          </DetailItem>

          <DetailItem>
            <Label>Clinic Phone:</Label>
            <Value>{renderValue(item.clinicDetails?.cPhone)}</Value>
          </DetailItem>
        </DetailRow>
      </CardWrapper>

      <SectionTitle>Sharing Details</SectionTitle>
      <CardWrapper>
        <DetailRow>
          <DetailItem>
            <Label>OPD:</Label>
            <Value>{renderValue(item.shareIn?.opd)}</Value>
          </DetailItem>

          <DetailItem>
            <Label>Indoor Visits:</Label>
            <Value>{renderValue(item.shareIn?.indoorVisits)}</Value>
          </DetailItem>

          <DetailItem>
            <Label>Operation:</Label>
            <Value>{renderValue(item.shareIn?.operation)}</Value>
          </DetailItem>

          <DetailItem>
            <Label>Procedure:</Label>
            <Value>{renderValue(item.shareIn?.procedure)}</Value>
          </DetailItem>
        </DetailRow>
      </CardWrapper>
    </PageWrapper>
  );
};

export default DoctorDetails;