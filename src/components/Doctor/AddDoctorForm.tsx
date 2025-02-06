import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import CreatableSelect from 'react-select/creatable';
import { postApi } from '../services/api';
import { toast } from 'react-toastify';
import FormFooter from '../common/FormFooter';
import { Grid, Typography, FormControl, Radio, RadioGroup, FormControlLabel,Button } from '@mui/material';

const PageContainer = styled.div`
  background-color: #FAF5EB;
  min-height: calc(100vh - 64px);
`;

const ContentWrapper = styled.div`
  background-color: #FAF5EB;
  height: 100%;
  padding: 20px;
`;

const FormCard = styled.div`
  background-color: #FAF5EB;
  border-radius: 4px;
  border: 1px solid #8C8A84;
`;

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: #f7d38a;
  border-bottom: 1px solid #8C8A84;
`;

const HeaderTitle = styled.div`
  font-size: 18px;
  color: #333333;
`;

const BackButton = styled.button`
  background-color: transparent;
  border: 1px solid #8C8A84;
  color: #333333;
  padding: 6px 16px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #f7d38a;
  }
`;

const FormContent = styled.div`
  padding: 24px;
`;


const StyledCreatableSelect = styled(CreatableSelect)`
  .select__control {
    border-color: #8C8A84;
    &:hover {
      border-color: #62B162;
    }
    &--is-focused {
      border-color: #62B162;
      box-shadow: none;
    }
  }
`;

const ErrorText = styled.div`
  color: #d32f2f;
  font-size: 12px;
  margin-top: 4px;
`;

const FormGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
`;

interface Option {
  value: string;
  label: string;
}

interface FormDataType {
  selectedDrHosRef: string;
  selectedDoctorType: string;
  status: string;
  firstName: string;
  middleName: string;
  lastName: string;
  degree: string;
  drregno: string;
  email: string;
  password: string;
  cPassword: string;
  mobileNumber: string;
  phoneNumber: string;
  department: string;
  speciality: string;
  qualification: string;
  designation: string;
  admissionDate: Date | null;
  dateOfWedding: Date | null;
  age: string;
  panNo: string;
  aadharNo: string;
  clinicName: string;
  clinicAddress: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  clinicPh: string;
  charge: string;
  opd: string;
  indoorVisit: string;
  operation: string;
  procedure: string;
  title: string;
  [key: string]: string | Date | null;
}





const InputField = styled.input`
  width: 100%;
  height: 38px;
  padding: 8px 12px;
  border: 1px solid #f7d38a;
  border-radius: 4px;
  background-color: #FAF5EB;
  box-shadow: none;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #dee2e6;
    box-shadow: none;
  }

  &::placeholder {
    color: #6c757d;
  }
`;

const SelectField = styled.select`
  width: 100%;
  height: 38px;
  padding: 8px 12px;
  border: 1px solid #f7d38a;
  border-radius: 4px;
  background-color: #FAF5EB;
  box-shadow: none;
  font-size: 14px;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px;

  &:focus {
    outline: none;
    border-color: #dee2e6;
    box-shadow: none;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  height: 38px;
  padding: 8px 12px;
  border: 1px solid #f7d38a;
  border-radius: 4px;
  background-color: #FAF5EB;
  box-shadow: none;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #dee2e6;
    box-shadow: none;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #FAF5EB;
  border-top: 1px solid #f7d38a;
`;

const PageButton = styled.button<{ active?: boolean }>`
  padding: 6px 12px;
  margin: 0 4px;
  border: 1px solid ${props => props.active ? '#62B162' : '#dee2e6'};
  border-radius: 4px;
  background-color: ${props => props.active ? '#62B162' : '#FAF5EB'};
  color: ${props => props.active ? '#FAF5EB' : '#212529'};
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: ${props => props.active ? '#62B162' : '#f7d38a'};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const TableContainer = styled.div`
  background-color: #FAF5EB;
  border: 1px solid #f7d38a;
  border-radius: 4px;
  overflow: hidden;
`;

const TableHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #f7d38a;
  background-color: #f7d38a;
  font-weight: 500;
`;

const TableCell = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #f7d38a;
  color: #212529;
  font-size: 14px;
`;

const StatusBadge = styled.span<{ type: string }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${props => {
    switch (props.type) {
      case 'In-House':
        return '#e3f2fd';
      default:
        return '#f7d38a';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'In-House':
        return '#0d47a1';
      default:
        return '#212529';
    }
  }};
`;

const ActionButton = styled(Button)`
  && {
    background-color: #4CAF50;
    color: white;
    text-transform: none;
    font-size: 14px;
    padding: 6px 16px;
    border-radius: 4px;
    box-shadow: none;
    height: 38px;

    &:hover {
      background-color: #43A047;
      box-shadow: none;
    }
  }
`;

const FormSection = styled.div`
  margin-bottom: 24px;
  background-color: #FAF5EB;
  border: 1px solid #f7d38a;
  border-radius: 4px;
  padding: 20px;
`;

const SectionTitle = styled.div`
  font-size: 16px;
  color: #212529;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f7d38a;
  font-weight: 500;
`;

const FormRow = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const RadioContainer = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  height: 38px;
`;

const StyledRadio = styled(FormControlLabel)`
  && {
    margin: 0;
    .MuiRadio-root {
      color: #6c757d;
      padding: 4px;
      &.Mui-checked {
        color: #4CAF50;
      }
    }
    .MuiTypography-root {
      font-size: 14px;
      color: #212529;
    }
  }
`;
const AddDoctorForm: React.FC = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<FormDataType>({
    selectedDrHosRef: '',
    selectedDoctorType: '',
    status: 'active',
    firstName: '',
    middleName: '',
    lastName: '',
    degree: '',
    drregno: '',
    email: '',
    password: '',
    cPassword: '',
    mobileNumber: '',
    phoneNumber: '',
    department: '',
    speciality: '',
    qualification: '',
    designation: '',
    admissionDate: null,
    dateOfWedding: null,
    age: '',
    panNo: '',
    aadharNo: '',
    clinicName: '',
    clinicAddress: '',
    area: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    clinicPh: '',
    charge: '',
    opd: '',
    indoorVisit: '',
    operation: '',
    procedure: '',
    title: 'Dr.'
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [qualificationOptions, setQualificationOptions] = useState<Option[]>([]);
  const [departmentOptions, setDepartmentOptions] = useState<Option[]>([]);
  const [specialityOptions, setSpecialityOptions] = useState<Option[]>([]);
  const [selectedQualification, setSelectedQualification] = useState<Option | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<Option | null>(null);
  const [selectedSpeciality, setSelectedSpeciality] = useState<Option | null>(null);

  useEffect(() => {
    const fetchMasterData = async () => {
      try {
        const [specialityRes, departmentRes, qualificationRes] = await Promise.all([
          postApi('hospital/specialization/list', {}),
          postApi('hospital/department/list', {}),
          postApi('hospital/qualification/list', {})
        ]);

        if (specialityRes.status === 200) {
          setSpecialityOptions(specialityRes.data.data.map((item: { name: string }) => ({
            value: item.name,
            label: item.name,
          })));
        }

        if (departmentRes.status === 200) {
          setDepartmentOptions(departmentRes.data.data.map((item: { name: string }) => ({
            value: item.name,
            label: item.name,
          })));
        }

        if (qualificationRes.status === 200) {
          setQualificationOptions(qualificationRes.data.data.map((item: { name: string }) => ({
            value: item.name,
            label: item.name,
          })));
        }
      } catch (error) {
        toast.error('Error fetching master data');
      }
    };

    fetchMasterData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateAge = (birthDate: Date): number => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    return age;
  };

  const handleDateChange = (date: Date | null, fieldName: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: date,
      ...(fieldName === 'admissionDate' && date ? { age: calculateAge(date).toString() } : {})
    }));
  };

  const handleSelectChange = (newValue: any | null, actionMeta: { name: string }) => {
    setFormData(prev => ({
      ...prev,
      [actionMeta.name]: newValue ? newValue.value : ''
    }));
  };

  const handleSelectCreate = async (inputValue: string, actionMeta: { name: string }) => {
    try {
      const response = await postApi(`hospital/${actionMeta.name}/add`, { name: inputValue });
      if (response.status === 200) {
        const newOption = { value: inputValue, label: inputValue };
        if (actionMeta.name === 'speciality') {
          setSpecialityOptions(prev => [...prev, newOption]);
          setSelectedSpeciality(newOption);
        } else if (actionMeta.name === 'department') {
          setDepartmentOptions(prev => [...prev, newOption]);
          setSelectedDepartment(newOption);
        } else if (actionMeta.name === 'qualification') {
          setQualificationOptions(prev => [...prev, newOption]);
          setSelectedQualification(newOption);
        }
      }
    } catch (error) {
      toast.error(`Error creating ${actionMeta.name}`);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const requiredFields = [
      'selectedDoctorType',
      'firstName',
      'middleName',
      'lastName',
      'degree',
      'drregno',
      'email',
      'password',
      'cPassword',
      'mobileNumber',
      'phoneNumber',
      'department',
      'speciality',
      'qualification',
      'charge'
    ];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
      }
    });

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.cPassword) {
      newErrors.cPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly');
      return;
    }

    try {
      const response = await postApi('hospital/doctor/add', formData);
      if (response.status === 200) {
        toast.success('Doctor added successfully');
        navigate('/doctor');
      } else {
        const error = response.response.data.error;
        Object.values(error).forEach((err: any) => toast.error(err));
      }
    } catch (error) {
      toast.error('Error adding doctor');
    }
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <FormCard>
          <FormHeader>
            <HeaderTitle>Doctor Registration</HeaderTitle>
            <BackButton onClick={() => navigate('/doctor')}>
              BACK
            </BackButton>
          </FormHeader>

          <FormContent>
            <form>
              <FormSection>
                <SectionTitle>General Information</SectionTitle>
                <FormRow>
                  <SelectField
                    value={formData.selectedDrHosRef}
                    onChange={handleInputChange}
                    name="selectedDrHosRef"
                  >
                    <option value="">Dr Hos/ref</option>
                    <option value="Dr. Smith">Dr. Smith</option>
                    <option value="Dr. Johnson">Dr. Johnson</option>
                  </SelectField>

                  <SelectField
                    value={formData.selectedDoctorType}
                    onChange={handleInputChange}
                    name="selectedDoctorType"
                  >
                    <option value="">Doctor Type</option>
                    <option value="In-House">In-House</option>
                    <option value="Outside">Outside</option>
                  </SelectField>

                  <div>
                    <RadioGroup
                      row
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                    >
                      <FormControlLabel
                        value="active"
                        control={<Radio sx={{ 
                          color: '#8C8A84',
                          '&.Mui-checked': {
                            color: '#62B162'
                          }
                        }} />}
                        label="Active"
                      />
                      <FormControlLabel
                        value="inactive"
                        control={<Radio sx={{ 
                          color: '#8C8A84',
                          '&.Mui-checked': {
                            color: '#62B162'
                          }
                        }} />}
                        label="Inactive"
                      />
                    </RadioGroup>
                  </div>
                </FormRow>

                <FormRow>
                  <SelectField
                    value={formData.title}
                    onChange={handleInputChange}
                    name="title"
                  >
                    <option value="Dr.">Dr.</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                  </SelectField>

                  <InputField
                    placeholder="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                  {errors.firstName && <ErrorText>{errors.firstName}</ErrorText>}

                  <InputField
                    placeholder="Middle Name"
                    name="middleName"value={formData.middleName}
                    onChange={handleInputChange}
                  />
                  {errors.middleName && <ErrorText>{errors.middleName}</ErrorText>}

                  <InputField
                    placeholder="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                  {errors.lastName && <ErrorText>{errors.lastName}</ErrorText>}
                </FormRow>

                <FormRow>
                  <StyledDatePicker
                    selected={formData.admissionDate}
                    onChange={(date: Date | null) => handleDateChange(date, 'admissionDate')}
                    placeholderText="Date of Birth"
                    maxDate={new Date()}
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={100}
                  />

                  <InputField
                    placeholder="Age"
                    name="age"
                    value={formData.age}
                    readOnly
                  />

                  <StyledDatePicker
                    selected={formData.dateOfWedding}
                    onChange={(date: Date | null) => handleDateChange(date, 'dateOfWedding')}
                    placeholderText="Wedding Date"
                    maxDate={new Date()}
                    showYearDropdown
                    scrollableYearDropdown
                  />
                </FormRow>
              </FormSection>

              <FormSection>
                <SectionTitle>Contact Information</SectionTitle>
                <FormRow>
                  <InputField
                    placeholder="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                  {errors.phoneNumber && <ErrorText>{errors.phoneNumber}</ErrorText>}

                  <InputField
                    placeholder="Mobile Number"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                  />
                  {errors.mobileNumber && <ErrorText>{errors.mobileNumber}</ErrorText>}
                </FormRow>

                <FormRow>
                  <InputField
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && <ErrorText>{errors.email}</ErrorText>}
                </FormRow>
              </FormSection>

              <FormSection>
                <SectionTitle>Professional Information</SectionTitle>
                <FormRow>
                  <StyledCreatableSelect
                    isClearable
                    name="speciality"
                    value={selectedSpeciality}
                    onChange={(newValue, actionMeta) => handleSelectChange(newValue, { name: 'speciality' })}
                    onCreateOption={(inputValue) => handleSelectCreate(inputValue, { name: 'speciality' })}
                    options={specialityOptions}
                    placeholder="Select or create speciality"
                  />
                  {errors.speciality && <ErrorText>{errors.speciality}</ErrorText>}

                  <StyledCreatableSelect
                    isClearable
                    name="department"
                    value={selectedDepartment}
                    onChange={(newValue, actionMeta) => handleSelectChange(newValue, { name: 'department' })}
                    onCreateOption={(inputValue) => handleSelectCreate(inputValue, { name: 'department' })}
                    options={departmentOptions}
                    placeholder="Select or create department"
                  />
                  {errors.department && <ErrorText>{errors.department}</ErrorText>}

                  <InputField
                    placeholder="Registration Number"
                    name="drregno"
                    value={formData.drregno}
                    onChange={handleInputChange}
                  />
                  {errors.drregno && <ErrorText>{errors.drregno}</ErrorText>}
                </FormRow>

                <FormRow>
                  <InputField
                    placeholder="Pan Number"
                    name="panNo"
                    value={formData.panNo}
                    onChange={handleInputChange}
                  />

                  <InputField
                    placeholder="Aadhar Number"
                    name="aadharNo"
                    value={formData.aadharNo}
                    onChange={handleInputChange}
                  />
                </FormRow>
              </FormSection>

              <FormSection>
                <SectionTitle>Clinic Details</SectionTitle>
                <FormRow>
                  <InputField
                    placeholder="Clinic Name"
                    name="clinicName"
                    value={formData.clinicName}
                    onChange={handleInputChange}
                  />

                  <InputField
                    placeholder="Clinic Phone"
                    name="clinicPh"
                    value={formData.clinicPh}
                    onChange={handleInputChange}
                  />
                </FormRow>

                <FormRow>
                  <InputField
                    placeholder="Clinic Address"
                    name="clinicAddress"
                    value={formData.clinicAddress}
                    onChange={handleInputChange}
                  />
                </FormRow>

                <FormRow>
                  <InputField
                    placeholder="Area"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                  />

                  <InputField
                    placeholder="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                  />

                  <InputField
                    placeholder="State"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                  />

                  <InputField
                    placeholder="Pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                  />
                </FormRow>
              </FormSection>

              <FormSection>
                <SectionTitle>Share Details (%)</SectionTitle>
                <FormRow>
                  <InputField
                    placeholder="OPD"
                    name="opd"
                    type="number"
                    value={formData.opd}
                    onChange={handleInputChange}
                  />

                  <InputField
                    placeholder="Indoor Visit"
                    name="indoorVisit"
                    type="number"
                    value={formData.indoorVisit}
                    onChange={handleInputChange}
                  />

                  <InputField
                    placeholder="Operation"
                    name="operation"
                    type="number"
                    value={formData.operation}
                    onChange={handleInputChange}
                  />

                  <InputField
                    placeholder="Procedure"
                    name="procedure"
                    type="number"
                    value={formData.procedure}
                    onChange={handleInputChange}
                  />
                </FormRow>
              </FormSection>

              <FormSection>
                <SectionTitle>Security Details</SectionTitle>
                <FormRow>
                  <InputField
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  {errors.password && <ErrorText>{errors.password}</ErrorText>}

                  <InputField
                    placeholder="Confirm Password"
                    name="cPassword"
                    type="password"
                    value={formData.cPassword}
                    onChange={handleInputChange}
                  />
                  {errors.cPassword && <ErrorText>{errors.cPassword}</ErrorText>}
                </FormRow>
              </FormSection>

              <FormFooter
                onSave={handleSubmit}
                saveButtonText="Add Doctor"
                showCancelButton={false}
                customStyle={{
                  backgroundColor: '#62B162',
                  color: '#FAF5EB',
                  border: 'none',
                  '&:hover': {
                    backgroundColor: '#559955'
                  }
                }}
              />
            </form>
          </FormContent>
        </FormCard>
      </ContentWrapper>
    </PageContainer>
  );
};

export default AddDoctorForm;