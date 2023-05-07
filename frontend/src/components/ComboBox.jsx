import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox() {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={products}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Product" />}
    />
  );
}


const products = [
  { label: 'Accountancy'},
  { label: 'Agricultural Supplies' },
  { label: 'Alternative Medicine' },
  { label: 'Animal Care' },
  { label: 'Architects/Surveyors' },
  { label: 'Artists & Galleries' },
  { label: 'Association' },
  { label: 'Aviation' },
  { label: 'Building Industry' },
  { label: 'Business Management' },
  { label: 'Catering & Restaurants' },
  { label: 'Chamber of Commerce' },
  { label: 'Charity' },
  { label: 'Chartered Surveyors' },
  { label: 'Chauffeuring Services & Taxis' },
  { label: 'Chemicals' },
  { label: 'Cleaning Contractors' },
  { label: 'Clothing' },
  { label: 'Commercial' },
  { label: 'Communications' },
  { label: 'Computing/IT' },
  { label: 'Mailing Service Maintenance' },
  { label: 'Manufacturer' },
  { label: 'Marine Services' },
  { label: 'Marketing Design' },
  { label: 'Media & Communications' },
  { label: 'Motor Trade' },
  { label: 'Networking Organisation' },
  { label: 'Newspapers & Publications' },
  { label: 'Non Commercial' },
  { label: 'None' },
  { label: 'Office & Stationary' },
  { label: 'Office Space' },
  { label: 'Pest Control' },
  { label: 'Photography' },
  { label: 'Printers' },
  { label: 'Private Member' },
  { label: 'Professional' },
  { label: 'Property Management' },
  { label: 'Protective Clothing' },
  { label: 'Public Sector' },
  { label: 'Recycling' },
  { label: 'Religious' },
  { label: 'Restaurant' },
  { label: 'Retail' },
  { label: 'Rotary' },
  { label: 'Safety Equipment' },
  { label: 'Sales' },
  { label: 'Consultancy Corporate Hospitality Design & PR' },
  { label: 'Disability Matters' },
  { label: 'Distributors' },
  { label: 'Eco/Environment' },
  { label: 'Education & Training' },
  { label: 'Electrical' },
  { label: 'Energy/Utility' },
  { label: 'Engineering' },
  { label: 'Entertainment' },
  { label: 'Estate Agency' },
  { label: 'Events/Exhibition' },
  { label: 'Financial Services' },
  { label: 'Flooring Specalist' },
  { label: 'Gardening/Horticultural & Accessories Honorary Member' },
  { label: 'Hospital/Homes/Health Care' },
  { label: 'Hotel/Conference' },
  { label: 'HR' },
  { label: 'Import/Export' },
  { label: 'Industrial' },
  { label: 'Insurance & Investment' },
  { label: 'Interior Design' },
  { label: 'Investigators' },
  { label: 'Languages' },
  { label: 'Legal' },
  { label: 'Leisure' },
  { label: 'Local Authorities' },
  { label: 'N/A' },
  
];