import React from 'react';
import { Table} from 'antd';
import 'antd/dist/antd.css';
const CustomTable = (props) => {
// var dataSource ;
//     useEffect(() => {
    console.log('props.data_storage',props.data_storage);
    const  dataSource = props.data_storage?.map(
           (el) =>  {
               return {
                key:el.centre_details.sessions[el.session_array_index].session_id,
                centre_name:el.centre_details.name,
                address:el.centre_details.address,
                vaccine:el.centre_details.sessions[el.session_array_index].vaccine,
                date:el.centre_details.sessions[el.session_array_index].date,
                availability_dose_1:el.centre_details.sessions[el.session_array_index].available_capacity_dose1,
                availability_dose_2:el.centre_details.sessions[el.session_array_index].available_capacity_dose2,
               }
               
           }
       );
    // },[]);
    const columns = [
        {
          title: 'Centre Name',
          dataIndex: 'centre_name',
          key: 'centre_name',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Vaccine',
          dataIndex: 'vaccine',
          key: 'vaccine',
        },
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: 'availability dose 1',
          dataIndex: 'availability_dose_1',
          key: 'availability_dose_1',
        },
        {
          title: 'availability dose 2',
          dataIndex: 'availability_dose_2',
          key: 'availability_dose_2',
        },
      ];
    
    return (
        <div>
            <Table dataSource={dataSource} columns={columns} />;
        </div>
    );
};

export default CustomTable;