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

//const redColor = { color: '#ef9a9a' }
//const redColor = { color: '#620000' }
//const redColor = { color: 'white' }
const redColor = {};
const DEFAULT_ACTIVE_CELL = [0, 1];

const getColumns = (visibleQ1, visibleQ2, visibleQ3, visibleQ4) => {
  return [
    { name: 'id', header: 'ID', visible: false },
    { name: 'rank', header: 'Rank', type: 'number', minWidth: 50, headerAlign: 'center', headerProps: { style: redColor } },
    {
      name: 'wing_id', header: 'Wing', minWidth: 90, headerAlign: 'center', headerProps: { style: redColor }
      //, whitespace: 'normal'
    },
    { name: 'group_id', header: 'Group', minWidth: 60, headerAlign: 'center', headerProps: { style: redColor } },
    { name: 'squadron_id', header: 'Sqn', minWidth: 60, headerAlign: 'center', headerProps: { style: redColor } },
    { name: 'flight_id', header: 'Flight', minWidth: 60, headerAlign: 'center', headerProps: { style: redColor } },
    { name: 'pri_code_id', header: 'Pri Code', minWidth: 80, headerAlign: 'center', headerProps: { style: redColor } },
    { name: 'request_code_id', header: 'Request Type', minWidth: 300, headerAlign: 'center', headerProps: { style: redColor } },
    { name: 'desc_title', header: 'Description', minWidth: 300, headerAlign: 'center', headerProps: { style: redColor } },
    { name: 'desc_details', header: 'Details', minWidth: 5, headerAlign: 'center', headerProps: { style: redColor } },
    { name: 'desc_impact', header: 'Impact', minWidth: 5, headerAlign: 'center', headerProps: { style: redColor } },
    { name: 'q1_desc', header: 'Q1 Desc', minWidth: 100, headerAlign: 'center', headerProps: { style: redColor }, visible: visibleQ1 },
    { name: 'q1_requested', header: 'Q1 Requested', minWidth: 100, headerAlign: 'center', headerProps: { style: redColor }, visible: visibleQ1 },
    { name: 'q1_allocated', header: 'Q1 Allocated', minWidth: 100, headerAlign: 'center', headerProps: { style: redColor }, visible: visibleQ1 },
    { name: 'q1_obligated', header: 'Q1 Obligated', minWidth: 100, headerAlign: 'center', headerProps: { style: redColor }, visible: visibleQ1 },
    { name: 'q2_desc', header: 'Q2 Desc', minWidth: 100, headerAlign: 'center', visible: visibleQ2 },
    { name: 'q2_requested', header: 'Q2 Requested', minWidth: 100, headerAlign: 'center', headerProps: { style: redColor }, visible: visibleQ2 },
    { name: 'q2_allocated', header: 'Q2 Allocated', minWidth: 100, headerAlign: 'center', headerProps: { style: redColor }, visible: visibleQ2 },
    { name: 'q2_obligated', header: 'Q2 Obligated', minWidth: 100, headerAlign: 'center', headerProps: { style: redColor }, visible: visibleQ2 },
    { name: 'q3_desc', header: 'Q3 Desc', minWidth: 100, headerAlign: 'center', visible: visibleQ3 },
    { name: 'q3_requested', header: 'Q3 Requested', minWidth: 100, headerAlign: 'center', headerProps: { style: redColor }, visible: visibleQ3 },
    { name: 'q3_allocated', header: 'Q3 Allocated', minWidth: 100, headerAlign: 'center', headerProps: { style: redColor }, visible: visibleQ3 },
    { name: 'q3_obligated', header: 'Q3 Obligated', minWidth: 100, headerAlign: 'center', headerProps: { style: redColor }, visible: visibleQ3 },
    { name: 'q4_desc', header: 'Q4 Desc', minWidth: 100, headerAlign: 'center', visible: visibleQ4 },
    { name: 'q4_requested', header: 'Q4 Requested', minWidth: 100, headerAlign: 'center', headerProps: { style: redColor }, visible: visibleQ4 },
    { name: 'q4_allocated', header: 'Q4 Allocated', minWidth: 100, headerAlign: 'center', headerProps: { style: redColor }, visible: visibleQ4 },
    { name: 'q4_obligated', header: 'Q4 Obligated', minWidth: 100, headerAlign: 'center', headerProps: { style: redColor }, visible: visibleQ4 },
  ];
};

const Home = () => {
  const [visibleQ1, setVisibleQ1] = useState(false);
  const [visibleQ2, setVisibleQ2] = useState(false);
  const [visibleQ3, setVisibleQ3] = useState(false);
  const [visibleQ4, setVisibleQ4] = useState(false);
  const [gridStyleTheme, setGridStyleTheme] = useState('amber-dark');
  const [pageStyleTheme, setPageStyleTheme] = useState('dark');
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  let inEdit;
  const [gridRef, setGridRef] = useState(null);
  const [dataSource, setDataSource] = useState([
    { id: 1, rank: 1, wing_id: '163 ATKW', group_id: 'OG', squadron_id: 'OSS', flight_id: 'ARM', pri_code_id: 'MC/MP', request_code_id: 'Contract Services/Equipment', desc_title: 'Raquetball courts for All', desc_details: 'Construct seven indoor, air-conditioned courts in the parking lot of bldg 4323, include security system, and build within a SCIF for classified discussion during game play', desc_impact: 'significantly improved morale', fy_requested: 'fy_requested', fy_allocated: 'fy_allocated', fy_obligated: 'fy_obligated', q1_desc: 'q1_desc', q1_requested: 'q1_requested', q1_allocated: 'q1_allocated', q1_obligated: 'q1_obligated', q2_desc: 'q1_desc', q2_requested: 'q1_requested', q2_allocated: 'q1_allocated', q2_obligated: 'q1_obligated', q3_desc: 'q1_desc', q3_requested: 'q1_requested', q3_allocated: 'q1_allocated', q3_obligated: 'q1_obligated', q4_desc: 'q1_desc', q4_requested: 'q1_requested', q4_allocated: 'q1_allocated', q4_obligated: 'q1_obligated' },
    { id: 2, rank: '6', age: 25 },
    { id: 3, rank: '3567', age: 27 },
    { id: 4, rank: '6', age: 81 },
    { id: 5, rank: '5468', age: 18 },
    { id: 6, rank: '56', age: 18 },
    { id: 7, rank: '886', age: 54 },
    { id: 8, rank: '3766', age: 30 },
    { id: 9, rank: '3', age: 40 },
    { id: 10, rank: '4', age: 44 },
    { id: 11, rank: '5', age: 24 },
    { id: 12, rank: '2', age: 61 },
    { id: 13, rank: '8', age: 16 },
    { id: 14, rank: '7', age: 34 },
    { id: 15, rank: '9', age: 3 },
    { id: 16, rank: '10', age: 31 },
    { id: 17, rank: '11', age: 40 }
  ]);

  const toggleDarkMode = (checked) => {
    setIsDarkMode(checked);
    if (checked) {
      // For the data grid.
      setPageStyleTheme('dark');
      setGridStyleTheme('amber-dark');

      // For the page itself.

    }
    else {
      setGridStyleTheme('default-light');
      setPageStyleTheme('light');
    }
  };

  //  const [columns, setColumns] = useState(getColumns())
  const [columns, setColumns] = useState(getColumns(visibleQ1, visibleQ2, visibleQ3, visibleQ4));
  const gridStyle = { minHeight: 550 };

  const renderSortTool = (direction, extraProps) => {
    return;
  };

  //    setDataSource( )

  const onEditStart = () => {
    inEdit = true;
  };

  const onEditStop = () => {
    requestAnimationFrame(() => {
      inEdit = false;
      gridRef.current.focus();
    });
  };

  const onKeyDown = (event) => {
    if (inEdit) {
      return;
    }

    const grid = gridRef.current;
    let [rowIndex, colIndex] = grid.computedActiveCell;
    console.log(`event.key: ${event.key}`);
    if (event.key === ' ' || event.key === 'Enter') {
      const column = grid.getColumnBy(colIndex);
      console.log(`column: ${column.name}`);
      if (!column) {
        return;
      }
      console.log(`rowIndex: ${rowIndex}`);
      grid.startEdit({rowIndex: rowIndex, columnId: column.name});
      console.log(`8`);
      event.preventDefault();
      console.log(`9`);
      return;
    }
    if (event.key !== 'Tab') {
      return;
    }
    console.log(`3`);
    event.preventDefault();
    console.log(`4`);
    event.stopPropagation();
    console.log(`5`);

    const direction = event.shiftKey ? -1 : 1;

    const columns = grid.visibleColumns;
    const rowCount = grid.count;

    colIndex += direction;
    if (colIndex === -1) {
      colIndex = columns.length - 1;
      rowIndex -= 1;
    }
    if (colIndex === columns.length) {
      rowIndex += 1;
      colIndex = 0;
    }
    if (rowIndex < 0 || rowIndex === rowCount) {
      return;
    }

    grid.setActiveCell([rowIndex, colIndex]);
  };

  const onEditComplete = ({ value, columnId, rowIndex }) => {
    const data = [...dataSource];
    data[rowIndex] = Object.assign({}, data[rowIndex], { [columnId]: value });

    setDataSource(data);
  };

  return (
    <>
      <div className='App' data-theme={pageStyleTheme}>
        <div style={{ marginBottom: 20 }}>
          <CheckBox checked={visibleQ1} onChange={visibleQ1 => {
            setVisibleQ1(visibleQ1);
            setColumns(getColumns(visibleQ1, visibleQ2, visibleQ3, visibleQ4));

          }}
          >Show Q1
          </CheckBox>
          <CheckBox checked={visibleQ2} onChange={visibleQ2 => {
            setVisibleQ2(visibleQ2);
            setColumns(getColumns(visibleQ1, visibleQ2, visibleQ3, visibleQ4));

          }}
          >Show Q2
          </CheckBox>
          <CheckBox checked={visibleQ3} onChange={visibleQ3 => {
            setVisibleQ3(visibleQ3);
            setColumns(getColumns(visibleQ1, visibleQ2, visibleQ3, visibleQ4));

          }}
          >Show Q3
          </CheckBox>
          <CheckBox checked={visibleQ4} onChange={visibleQ4 => {
            setVisibleQ4(visibleQ4);
            setColumns(getColumns(visibleQ1, visibleQ2, visibleQ3, visibleQ4));

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
          onReady={setGridRef}
          idProperty="id"
          theme={gridStyleTheme}
          style={gridStyle}
          rowIndexColumn
          columnDefaultWidth={50}
          showColumnMenuTool={false}
          allowUnsort={false}
          renderSortTool={renderSortTool}
          headerAlign={"center"}
          rowHeight={null}
          minRowHeight={40}
          enableColumnAutosize
          defaultActiveCell={DEFAULT_ACTIVE_CELL}
          onKeyDown={onKeyDown}
          onEditComplete={onEditComplete}
          onEditStart={onEditStart}
          onEditStop={onEditStop}
          editable={true}
          columns={columns}
          dataSource={dataSource}
        //        renderColumnContextMenu={renderColumnContextMenu}
        />
      </div>
    </>
  );
};

export default Home;



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
