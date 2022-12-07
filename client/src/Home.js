import React, { useState, useCallback } from "react";
import ReactDataGrid from '@inovua/reactdatagrid-enterprise'
import '@inovua/reactdatagrid-enterprise/index.css'
import CheckBox from '@inovua/reactdatagrid-community/packages/CheckBox'
import '@inovua/reactdatagrid-enterprise/theme/default-dark.css'

const Home = () => {
const [visibleQ1, setVisibleQ1] = useState(false)
const [visibleQ2, setVisibleQ2] = useState(false)
const [visibleQ3, setVisibleQ3] = useState(false)
const [visibleQ4, setVisibleQ4] = useState(false)

//  const getColumns = () => {
  const getColumns =
    [
      { name: 'id', header: 'ID', minWidth: 50, defaultFlex: 2 },
      { name: 'pri_ranking', header: 'Pri Ranking', maxWidth: 1000, defaultFlex: 1 },
      // { name: 'wing_id', header: 'Wing', maxWidth: 1000, defaultFlex: 1 },
      // { name: 'group_id', header: 'Group', maxWidth: 1000, defaultFlex: 1 },
      // { name: 'squadron_id', header: 'Sqn', maxWidth: 1000, defaultFlex: 1 },
      // { name: 'flight_id', header: 'Flight', maxWidth: 1000, defaultFlex: 1 },
      // { name: 'pri_code_id', header: 'Pri Code', maxWidth: 1000, defaultFlex: 1 },
      // { name: 'request_code_id', header: 'Request Type', maxWidth: 1000, defaultFlex: 1 },
      // { name: 'desc_title', header: 'Description', maxWidth: 1000, defaultFlex: 1 },
      { name: 'desc_details', header: 'Details', maxWidth: 1000, defaultFlex: 1 },
      { name: 'desc_impact', header: 'Impact', maxWidth: 1000, defaultFlex: 1 },
      // { name: 'q1_desc', header: 'Q1 Desc', width: -1, defaultFlex: 1, hidden: true },
      { name: 'q1_desc', header: 'Q1 Desc', maxWidth: 1000, defaultFlex: 1, visible: visibleQ1 },
      { name: 'q1_requested', header: 'Q1 Requested', maxWidth: 1000, defaultFlex: 1, visible: visibleQ1 },
      { name: 'q1_allocated', header: 'Q1 Allocated', maxWidth: 1000, defaultFlex: 1, visible: visibleQ1 },
      { name: 'q1_obligated', header: 'Q1 Obligated', maxWidth: 1000, defaultFlex: 1, visible: visibleQ1 },
      { name: 'q2_desc', header: 'Q2 Desc', maxWidth: 1000, defaultFlex: 1, visible: visibleQ2 },
      { name: 'q2_requested', header: 'Q2 Requested', maxWidth: 1000, defaultFlex: 1, visible: visibleQ2 },
      { name: 'q2_allocated', header: 'Q2 Allocated', maxWidth: 1000, defaultFlex: 1, visible: visibleQ2 },
      { name: 'q2_obligated', header: 'Q2 Obligated', maxWidth: 1000, defaultFlex: 1, visible: visibleQ2 },
      { name: 'q3_desc', header: 'Q3 Desc', maxWidth: 1000, defaultFlex: 1, visible: visibleQ3 },
      { name: 'q3_requested', header: 'Q3 Requested', maxWidth: 1000, defaultFlex: 1, visible: visibleQ3 },
      { name: 'q3_allocated', header: 'Q3 Allocated', maxWidth: 1000, defaultFlex: 1, visible: visibleQ3 },
      { name: 'q3_obligated', header: 'Q3 Obligated', maxWidth: 1000, defaultFlex: 1, visible: visibleQ3 },
      { name: 'q4_desc', header: 'Q4 Desc', maxWidth: 1000, defaultFlex: 1, visible: visibleQ4 },
      { name: 'q4_requested', header: 'Q4 Requested', maxWidth: 1000, defaultFlex: 1, visible: visibleQ4 },
      { name: 'q4_allocated', header: 'Q4 Allocated', maxWidth: 1000, defaultFlex: 1, visible: visibleQ4 },
      { name: 'q4_obligated', header: 'Q4 Obligated', maxWidth: 1000, defaultFlex: 1, visible: visibleQ4 },
    ]
//  }

//  const [columns, setColumns] = useState(getColumns())
  const [columns, setColumns] = useState(getColumns)
  const gridStyle = { minHeight: 550 }

  const dataSource = [
    { id: 1, pri_ranking: 'John McQueen', desc_details: 'desc_details', desc_impact: 'desc_impact', q1_desc: 'q1_desc', q1_requested: 'q1_requested' },
    { id: 2, pri_ranking: 'Mary Stones', age: 25 },
    { id: 3, pri_ranking: 'Robert Fil', age: 27 },
    { id: 4, pri_ranking: 'Roger Robson', age: 81 },
    { id: 5, pri_ranking: 'Billary Konwik', age: 18 },
    { id: 6, pri_ranking: 'Bob Martin', age: 18 },
    { id: 7, pri_ranking: 'Matthew Richardson', age: 54 },
    { id: 8, pri_ranking: 'Ritchie Peterson', age: 54 },
    { id: 9, name: 'Bryan Martin', age: 40 },
    { id: 10, name: 'Mark Martin', age: 44 },
    { id: 11, name: 'Michelle Sebastian', age: 24 },
    { id: 12, name: 'Michelle Sullivan', age: 61 },
    { id: 13, name: 'Jordan Bike', age: 16 },
    { id: 14, name: 'Nelson Ford', age: 34 },
    { id: 15, name: 'Tim Cheap', age: 3 },
    { id: 16, name: 'Robert Carlson', age: 31 },
    { id: 17, name: 'Johny Perterson', age: 40 }
  ]

  const renderColumnContextMenu = useCallback((menuProps, { cellProps }) => {
//    menuProps.items = menuProps.items.concat([
      menuProps.items = [
        {
          label: 'Show Q1',
          onClick: () => {
  console.log('Show Q1 pressed!');
            menuProps.onDismiss();
          }
        },
        {
          label: 'Hide Q1',
          onClick: () => {
  console.log('Hide Q1 pressed!');
            menuProps.onDismiss();
          }
        }
    ]//)
  }, [])

//  const onColumnVisibleChange = useCallback(({ column, visible }) => {
    // inovua.notification.first.addNotification({
    //   title: 'Visibility changed',
    //   content: column.name + ' column visibility is set to: ' + visible
    // })
//  }, [])


  //FETCH MISSION DATA
//   useEffect(() => {
// console.log(`fetch`)
//     fetch("http://localhost:8081/")
//       .then((res) => res.json())
//       .then((data) => {
//         setMovieData(data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   useEffect(() => {
//     if(!movieSearchData[0]){
// console.log(`setMovieSearchData`)
//     return setMovieSearchData(movieData)
//   }
// }, );
  // Sets the "Search Term" on change of the search text box (default is "")
//   const handleSearch = (event) => {
//     if(movieSearchData[0]){
// console.log(`movieSearchData`)
//       setMovieSearchData(movieSearchData.filter(title => JSON.stringify(title).toLowerCase().includes(event.target.value.toLowerCase())));
//     }
// console.log(`setSearchTerm`)
//     setSearchTerm(event.target.value)
//   }

//   if(!movieData[0]) { return;}
console.log(`render`)
  return (
    <>
       <CheckBox checked={visibleQ1} onChange={clickVal => {
console.log(`clickVal: ${clickVal}`)
            setVisibleQ1(clickVal)
            return setTimeout(() => {console.log("timeout");setColumns(getColumns)}, 500);

          }}
          >Show Q1
       </CheckBox>

      <ReactDataGrid
        idProperty="id"
        columns={columns}
        dataSource={dataSource}
        style={gridStyle}
        renderColumnContextMenu={renderColumnContextMenu}
//        onColumnVisibleChange={onColumnVisibleChange}
      />
    </>
    )
}

export default Home

/*
       <CheckBox checked={visibleQ2} onChange={visibleQ2 => {
            setVisibleQ2(visibleQ2)
            setColumns(getColumns())
          }}
          >Show Q2
       </CheckBox>
       <CheckBox checked={visibleQ3} onChange={visibleQ3 => {
            setVisibleQ3(visibleQ3)
            setColumns(getColumns())
          }}
          >Show Q3
       </CheckBox>
       <CheckBox checked={visibleQ4} onChange={visibleQ4 => {
            setVisibleQ4(visibleQ4)
            setColumns(getColumns())
          }}
          >Show Q4
       </CheckBox>
*/