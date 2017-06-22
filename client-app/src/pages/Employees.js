import React, { Component } from 'react';
import axios from 'axios';
import { ButtonGroup, Button, FormGroup, ControlLabel, FormControl, Col, Form } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class Employees extends Component {
   
    constructor() {
        super();
        this.onUpdateBtnClicked = this.onUpdateBtnClicked.bind(this);
        this.onAddBtnClicked = this.onAddBtnClicked.bind(this);
        this.onDeleteBtnClicked = this.onDeleteBtnClicked.bind(this);
        this.onRowSelect = this.onRowSelect.bind(this);
        this.onUpdateEmployeeNameChange = this.onUpdateEmployeeNameChange.bind(this);
         this.onUpdateEmployeeSurnameChange = this.onUpdateEmployeeSurnameChange.bind(this);
        this.onUpdateEmployeeSalaryChange = this.onUpdateEmployeeSalaryChange.bind(this);         
        this.state = {
            URL : 'http://localhost:8080/employees',
            
			object: {
				id: null, 
				name: '', 
				surname: '', 
				salary: '', 
				departmentId: null
			},
            data: [],
            selectedId: null
        };
    }
    

    render() {
        
        var selectRowProp = {
            mode: "radio",
            clickToSelect: true,
            onSelect: this.onRowSelect
        };
        return (
				
             <div>
               <center>
               <ButtonGroup className="m-10">
                    <Button bsStyle="primary" onClick={this.onAddBtnClicked}>Ekle</Button>        
                    <Button bsStyle="primary" onClick={this.onUpdateBtnClicked} disabled={this.state.selectedId === null}>Güncelle</Button>
                    <Button bsStyle="primary" onClick={this.onDeleteBtnClicked} disabled={this.state.selectedId === null}>Sil</Button>  
               </ButtonGroup>
               </center>      

        <Form horizontal>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>Ad</Col>
                            <Col sm={10}>
                            <FormControl
                                type="text"
                                placeholder="Ad Giriniz"
                                value ={this.state.object.name}
                                onChange={this.onUpdateEmployeeNameChange}/>
                            </Col>
                            </FormGroup>
                            <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>Soyad</Col>
                            <Col sm={10}>
                            <FormControl
                                type="text"
                                placeholder="Soyad Giriniz"
                                value ={this.state.object.surname}
                                onChange={this.onUpdateEmployeeSurnameChange}/>
                            </Col>
                            </FormGroup>
                            <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>Maaş</Col>
                            <Col sm={10}>
                            <FormControl
                                type="text"
                                placeholder="Maaş Giriniz"
                                value ={this.state.object.salary}
                                onChange={this.onUpdateEmployeeSalaryChange} />
                            </Col>
                
                        </FormGroup>
                    </Form>
     
                    
                    <BootstrapTable data={this.state.data} striped={true} hover={true} search={true} selectRow={selectRowProp}>
                        <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField="name" dataSort={true}>Ad</TableHeaderColumn>
                        <TableHeaderColumn dataField="surname">Soyad</TableHeaderColumn>
                        <TableHeaderColumn dataField="salary">Maaş</TableHeaderColumn>
                    </BootstrapTable>
                </div>

                );
    }
 	//Input changes
	onUpdateEmployeeNameChange(event) {
            
               console.log(this.state.object);
                this.setState({object :{ name : event.target.value,surname : this.state.object.surname,salary : this.state.object.salary,id : this.state.object.id,departmentId : this.state.object.departmentId}});
		this.forceUpdate();    
	}
        

	onUpdateEmployeeSurnameChange(event) {
            console.log(this.state.object);
		 this.setState({object :{ surname : event.target.value,name : this.state.object.name,salary : this.state.object.salary,id : this.state.object.id,departmentId : this.state.object.departmentId}});
		this.forceUpdate(); 
	}

	onUpdateEmployeeSalaryChange(event) {
            console.log(this.state.object);
		 this.setState({object :{ salary : event.target.value,surname : this.state.object.surname,name : this.state.object.name,id : this.state.object.id,departmentId : this.state.object.departmentId}});
		this.forceUpdate(); 		
	}      
 
    
    onRowSelect(row, isSelected) {
        if (isSelected) {
            console.log("onRowSelect");
            console.log(this.state.object);
            this.setState({selectedId: row.id});
            this.fillObject(row.id);
        } else { 
            this.setState({selectedId: null});
        }
        
       
    }

    fillObject(selectedRow) {
  	var selected = this.getById(selectedRow);
//        var   tempObject: {
//			id: selected.id, 
//			name: selected.name, 
//			surname: selected.surname, 
//			salary: selected.salary
//            };   
        this.setState({object: selected});
        console.log("Obje : ");
        console.log(this.state.object);
//		this.state.object = {
//			id: selected.id, 
//			name: selected.name, 
//			surname: selected.surname, 
//			salary: selected.salary, 
//			departmentId: selected.departmentId
//		}
    }
    
	getById(id) {
		for(var i in this.state.data) {
			if(this.state.data[i].id === id) {
				return this.state.data[i];
			}
		}
		return '';
	}
        
    getAll() {
        axios.get(this.state.URL)
                .then(function (response) {
                    this.setState({data: response.data});
                }.bind(this));
    }
    componentDidMount() {
        this.getAll();
    }
    onUpdateBtnClicked() {
        axios.put(this.state.URL + '/' + this.state.object.id, this.state.object)
                .then(function (response) {
                    this.setState({selectedId: null});
                    this.getAll();
                    console.log(response);
                }.bind(this))
                .catch(function (error) {
                    console.log(error);
                });
        this.forceUpdate();
    }

    onAddBtnClicked() {
        console.log(this.state.object);
        this.setState({object :{ id : null }});
        axios.post(this.state.URL, this.state.object)
                .then(function (response) {
                    this.getAll();           
                    console.log(response);
                }.bind(this))
                .catch(function (error) {
                    console.log(error);
                });
    }

    onDeleteBtnClicked() {
        axios.delete(this.state.URL + '/' + this.state.selectedId)
                .then(function (response) {
                    this.setState({selectedId: null});
                    this.getAll();
                    console.log(response);
                }.bind(this))
                .catch(function (error) {
                    console.log(error);
                });
    }
}

export default Employees;
