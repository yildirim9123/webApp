import React, { Component } from 'react';
import axios from 'axios';
import { ButtonGroup, Button, FormGroup, ControlLabel, FormControl, Col, Form } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class Departments extends Component {
   
    constructor() {
        super();
        this.onUpdateBtnClicked = this.onUpdateBtnClicked.bind(this);
        this.onAddBtnClicked = this.onAddBtnClicked.bind(this);
        this.onDeleteBtnClicked = this.onDeleteBtnClicked.bind(this);
        this.onRowSelect = this.onRowSelect.bind(this);
        this.onUpdateDepartmentNameChange = this.onUpdateDepartmentNameChange.bind(this);
        this.onUpdateDepartmentDescriptionChange = this.onUpdateDepartmentDescriptionChange.bind(this);       
        this.state = {
            URL : 'http://localhost:8080/departments',
            
			object: {
				id: null, 
				name: '', 
				description: ''
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
                            <Col componentClass={ControlLabel} sm={2}>Departman Adı</Col>
                            <Col sm={10}>
                            <FormControl
                                type="text"
                                placeholder="Departman Adı Giriniz"
                                value ={this.state.object.name}
                                onChange={this.onUpdateDepartmentNameChange}/>
                            </Col>
                            </FormGroup>
                            <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>Departman Açıklama</Col>
                            <Col sm={10}>
                            <FormControl
                                type="text"
                                placeholder="Departman Açıklaması Giriniz"
                                value ={this.state.object.description}
                                onChange={this.onUpdateDepartmentDescriptionChange} />
                            </Col>
                
                        </FormGroup>
                    </Form>
     
                    
                    <BootstrapTable data={this.state.data} striped={true} hover={true} search={true} selectRow={selectRowProp}>
                        <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField="name" dataSort={true}>Departman Adı</TableHeaderColumn>
                        <TableHeaderColumn dataField="description">Departman Açıklama</TableHeaderColumn>
                    </BootstrapTable>
                </div>

                );
    }
 	//Input changes
	onUpdateDepartmentNameChange(event) {
            
               console.log(this.state.object);
                this.setState({object :{ name : event.target.value,description : this.state.object.description,id : this.state.object.id}});
		this.forceUpdate();    
	}
        

	onUpdateDepartmentDescriptionChange(event) {
            console.log(this.state.object);
		 this.setState({object :{ description : event.target.value,name : this.state.object.name,id : this.state.object.id}});
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
        this.setState({object: selected});
        console.log("Obje : ");
        console.log(this.state.object);
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

export default Departments;
