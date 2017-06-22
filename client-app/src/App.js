import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import Employees from './pages/Employees'
import Departments from './pages/Departments'
import Meetings from './pages/Meetings'


class App extends Component {
    render() {
        return (
<div >
			<div className="header">
				<p className="header-info">
					React Uygulaması
				</p>
                         
			</div>
                                                       
                                <Tabs defaultActiveKey={1}>
                                 <Tab id="employees" eventKey={1} title="Employees"><Employees/></Tab>
                                 <Tab id="departments" eventKey={2} title="Departments"><Departments/></Tab>
                                 <Tab id="meetings" eventKey={3} title="Meetings"><Meetings/></Tab>
                                </Tabs>
 </div>                               
                );
    }
}
;

export default App;
