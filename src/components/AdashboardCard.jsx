 const DashboardCard = ({ title, value, extra, icon: Icon, iconColor, bgColor, width , height ,className}) => {
  return (
    <div className={`flex flex-col p-6 rounded-2xl shadow-md hover:shadow-2xl  ${bgColor} ${className} ${width} ${height}`}>
      <div className="flex items-center justify-between mb-2 min-w-6">
        <h2 className="text-lg font-semibold text-green-700">{title}</h2>
        {Icon && <Icon className={`w-6 h-6 ${iconColor}`} />}
      </div>
      <div className="text-2xl text-yellow-500 font-bold mb-1">{value}</div>
      <div className="text-sm text-gray-600">{extra}</div>
    </div>
  );
};

export default DashboardCard;