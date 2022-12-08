// General Dependencies.
import { DarkModeSwitch } from 'react-toggle-dark-mode';

// State Hooks.
import React, { useState } from "react";

// Grid dependencies.
import ReactDataGrid from '@inovua/reactdatagrid-enterprise';
import CheckBox from '@inovua/reactdatagrid-community/packages/CheckBox';

// CSS.
// import './css/index.css'
// import './css/app.css'
import '@inovua/reactdatagrid-enterprise/index.css';
//import '@inovua/reactdatagrid-enterprise/base.css'
import '@inovua/reactdatagrid-enterprise/theme/amber-dark.css';
//import { createTheming } from 'react-color-theme';

const getColumns = (visibleQ1,visibleQ2,visibleQ3,visibleQ4) => {
  return [
    { name: 'id', header: 'ID', minWidth: 20, defaultFlex: 2, visible: false},
    { name: 'pri_ranking', header: 'Pri Ranking', maxWidth: 1000, defaultFlex: 1 },
    { name: 'wing_id', header: 'Wing', maxWidth: 1000, defaultFlex: 1 },
    { name: 'group_id', header: 'Group', maxWidth: 1000, defaultFlex: 1 },
    { name: 'squadron_id', header: 'Sqn', maxWidth: 1000, defaultFlex: 1 },
    { name: 'flight_id', header: 'Flight', maxWidth: 1000, defaultFlex: 1 },
    { name: 'pri_code_id', header: 'Pri Code', maxWidth: 1000, defaultFlex: 1 },
    { name: 'request_code_id', header: 'Request Type', maxWidth: 1000, defaultFlex: 1 },
    { name: 'desc_title', header: 'Description', maxWidth: 1000, defaultFlex: 1 },
    { name: 'desc_details', header: 'Details', maxWidth: 1000, defaultFlex: 1 },
    { name: 'desc_impact', header: 'Impact', maxWidth: 1000, defaultFlex: 1 },
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
  ];
}

const Home = () => {
  const [visibleQ1, setVisibleQ1] = useState(false);
  const [visibleQ2, setVisibleQ2] = useState(false);
  const [visibleQ3, setVisibleQ3] = useState(false);
  const [visibleQ4, setVisibleQ4] = useState(false);
  const [gridStyleTheme, setGridStyleTheme] = useState('amber-dark');
  const [pageStyleTheme, setPageStyleTheme] = useState('dark');
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const toggleDarkMode = (checked) => {
    setIsDarkMode(checked);
    if(checked) {
      // For the data grid.
      setPageStyleTheme('dark')
      setGridStyleTheme('amber-dark')

      // For the page itself.

    }
    else {
      setGridStyleTheme('default-light')
      setPageStyleTheme('light')
    }
  };

  //  const [columns, setColumns] = useState(getColumns())
  const [columns, setColumns] = useState(getColumns(visibleQ1,visibleQ2,visibleQ3,visibleQ4));
  const gridStyle = { minHeight: 550 };

  const dataSource = [
    { id: 1, pri_ranking: 1, wing_id: '163 ATKW', group_id: 'OG', squadron_id: 'OSS', flight_id: 'ARM', pri_code_id: 'MC/MP', request_code_id: 'Contract Services/Equipment', desc_title: 'Raquetball courts for All', desc_details: 'Construct seven indoor, air-conditioned courts in the parking lot of bldg 4323, include security system, and build within a SCIF for classified discussion during game play', desc_impact: 'significantly improved morale', fy_requested: 'fy_requested', fy_allocated: 'fy_allocated', fy_obligated: 'fy_obligated', q1_desc: 'q1_desc', q1_requested: 'q1_requested', q1_allocated: 'q1_allocated', q1_obligated: 'q1_obligated', q2_desc: 'q1_desc', q2_requested: 'q1_requested', q2_allocated: 'q1_allocated', q2_obligated: 'q1_obligated', q3_desc: 'q1_desc', q3_requested: 'q1_requested', q3_allocated: 'q1_allocated', q3_obligated: 'q1_obligated', q4_desc: 'q1_desc', q4_requested: 'q1_requested', q4_allocated: 'q1_allocated', q4_obligated: 'q1_obligated'},
    { id: 2, pri_ranking: 'Mary Stones', age: 25 },
    { id: 3, pri_ranking: 'Robert Fil', age: 27 },
    { id: 4, pri_ranking: 'Roger Robson', age: 81 },
    { id: 5, pri_ranking: 'Billary Konwik', age: 18 },
    { id: 6, pri_ranking: 'Bob Martin', age: 18 },
    { id: 7, pri_ranking: 'Matthew Richardson', age: 54 },
    { id: 8, pri_ranking: 'Neymar Jr', age: 30 },
    { id: 9, name: 'Bryan Martin', age: 40 },
    { id: 10, name: 'Mark Martin', age: 44 },
    { id: 11, name: 'Michelle Sebastian', age: 24 },
    { id: 12, name: 'Michelle Sullivan', age: 61 },
    { id: 13, name: 'Jordan Bike', age: 16 },
    { id: 14, name: 'Nelson Ford', age: 34 },
    { id: 15, name: 'Tim Cheap', age: 3 },
    { id: 16, name: 'Robert Carlson', age: 31 },
    { id: 17, name: 'Johny Perterson', age: 40 }
  ];

  return (
    <>
      <div className='App' data-theme={pageStyleTheme}>
      <div style={{marginBottom: 20}}>
          <CheckBox checked={visibleQ1} onChange={visibleQ1 => {
          setVisibleQ1(visibleQ1);
          setColumns(getColumns(visibleQ1,visibleQ2,visibleQ3,visibleQ4))

        }}
        >Show Q1
        </CheckBox>
          <CheckBox checked={visibleQ2} onChange={visibleQ2 => {
          setVisibleQ2(visibleQ2);
          setColumns(getColumns(visibleQ1,visibleQ2,visibleQ3,visibleQ4))

        }}
        >Show Q2
        </CheckBox>
          <CheckBox checked={visibleQ3} onChange={visibleQ3 => {
          setVisibleQ3(visibleQ3);
          setColumns(getColumns(visibleQ1,visibleQ2,visibleQ3,visibleQ4))

        }}
        >Show Q3
        </CheckBox>
          <CheckBox checked={visibleQ4} onChange={visibleQ4 => {
          setVisibleQ4(visibleQ4);
          setColumns(getColumns(visibleQ1,visibleQ2,visibleQ3,visibleQ4))

        }}
        >Show Q4
        </CheckBox>
      </div>

      <div>
      <DarkModeSwitch
        style={{ marginBottom: '2rem' }}
        checked={isDarkMode}
        onChange={toggleDarkMode}
        size={40}
      />
      </div>

      <ReactDataGrid
        idProperty="id"
        theme={gridStyleTheme}
        style={gridStyle}
        columns={columns}
        dataSource={dataSource}
//        renderColumnContextMenu={renderColumnContextMenu}
      />
    </div>
    </>
  );
};

export default Home



  // const renderColumnContextMenu = useCallback((menuProps, { cellProps }) => {
  //   //    menuProps.items = menuProps.items.concat([
  //   menuProps.items = [
  //     {
  //       label: 'Show Q1',
  //       onClick: () => {
  //         console.log('Show Q1 pressed!');
  //         menuProps.onDismiss();
  //       }
  //     },
  //     {
  //       label: 'Hide Q1',
  //       onClick: () => {
  //         console.log('Hide Q1 pressed!');
  //         menuProps.onDismiss();
  //       }
  //     }
  //   ];//)
  // }, []);

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
