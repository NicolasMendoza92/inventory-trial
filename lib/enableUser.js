const technos = ['AFOLU', 'Any transportation project', 'ARR', 'Biomas to Electricity', 'Biomas to heat', 'Cogeneration', 'Combined cycle', 'Cookstove', 'Energy Efficiency - Agriculture Sector',
'Energy Efficiency - Commercial Sector', 'Energy Efficiency - Domestic', 'Energy Efficiency - Industrial', 'Energy Efficiency - Public Sector', 'Gheotermal', 'HFC', 'Hydro',
'IFM', 'Landfill gas', 'Landfill to energy', 'Mangroves', 'Manufacturing industries', 'Manure management', 'Methane Recovery', 'Mine Methane Utilization Project', 'N20 destrutction',
'Oil Management', 'Run of river', 'REDD', 'REDD+', 'SF6', 'Small Renewable energy projects', 'Small Hydro', 'Solar', 'Solar Cookstove', 'Waste', 'Waste to compost', 'Wind']

const enableusers = ["test@gmail.com","test2@gmail.com"]

export default function isEnableUser(session) {
  if (enableusers.includes(session?.user.email)) {
    return true;
  } else {
    return false;
  }
}