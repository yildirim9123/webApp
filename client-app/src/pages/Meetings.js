import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { ButtonGroup, Button, FormGroup, ControlLabel, FormControl, Col, Form } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class Meetings extends Component {
   
    constructor() {
        super();
        this.onUpdateBtnClicked = this.onUpdateBtnClicked.bind(this);
        this.onAddBtnClicked = this.onAddBtnClicked.bind(this);
        this.onDeleteBtnClicked = this.onDeleteBtnClicked.bind(this);
        this.onRowSelect = this.onRowSelect.bind(this);
        this.onUpdateMeetingNameChange = this.onUpdateMeetingNameChange.bind(this);
        this.onUpdateMeetingDescriptionChange = this.onUpdateMeetingDescriptionChange.bind(this);
        this.onUpdateMeetingDepartmentChange = this.onUpdateMeetingDepartmentChange.bind(this);
        this.state = {
            URL : 'http://localhost:8080/meetings',
            DepartmentsURL : 'http://localhost:8080/departments',
            departments : null,
			object: {
				id: null, 
				name: '', 
				description: '',
				departments: null
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
                            <Col componentClass={ControlLabel} sm={2}>Toplantı Adı</Col>
                            <Col sm={10}>
                            <FormControl
                                type="text"
                                placeholder="Toplantı Adı Giriniz"
                                value ={this.state.object.name}
                                onChange={this.onUpdateMeetingNameChange}/>
                            </Col>
                            </FormGroup>
                            <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>Toplantı Açıklama</Col>
                            <Col sm={10}>
                            <FormControl
                                type="text"
                                placeholder="Toplantı Açıklaması Giriniz"
                                value ={this.state.object.description}
                                onChange={this.onUpdateMeetingDescriptionChange} />
                            </Col>
                            </FormGroup> 
                            <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>Departman</Col>
                            <Col sm={10}>
							<Select
								name="departmentsField"
								multi={true}
								value={this.getDepartmentOptions(this.state.object.departments)}
								options={this.getDepartmentOptions(this.state.departments)}
								onChange={this.onUpdateMeetingDepartmentChange} />
                            </Col>
                            </FormGroup>                            

                    </Form>
     
                    
                    <BootstrapTable data={this.state.data} striped={true} hover={true} search={true} selectRow={selectRowProp}>
                        <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField="name" dataSort={true}>Toplantı Adı</TableHeaderColumn>
                        <TableHeaderColumn dataField="description">Toplantı Açıklama</TableHeaderColumn>
                    </BootstrapTable>
                </div>

                );
    }
 	//Input changes
	onUpdateMeetingNameChange(event) {
            
               console.log(this.state.object);
                this.setState({object :{ name : event.target.value,description : this.state.object.description,id : this.state.object.id}});
		this.forceUpdate();    
	}
        

	onUpdateMeetingDescriptionChange(event) {
            console.log(this.state.object);
		 this.setState({object :{ description : event.target.value,name : this.state.object.name,id : this.state.object.id}});
		this.forceUpdate(); 
	}
        
	onUpdateMeetingDepartmentChange(selection) {

		if (selection === null) {
			this.setState({object :{ departments: null, id : this.state.object.id, name : this.state.object.name, description : this.state.object.description}});
		} else {
			var departments = selection.map(function(obj){ 
				var rObj = {};
				rObj['id'] = obj['value'];
				rObj['name'] = obj['label'];
				return rObj;
			});
			
			this.setState({object :{ departments: departments, id : this.state.object.id, name : this.state.object.name, description : this.state.object.description}});
		}

		this.forceUpdate();		
	}
        
	getDepartmentOptions(departments) {
		var options = [];
		
		if(!departments) {
			return options;
		}

		options = departments.map(function(obj){ 
			var rObj = {};
			rObj['value'] = obj['id'];
			rObj['label'] = obj['name'];
			return rObj;
		});

		return options;		
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
    axios.all([axios.get(this.state.URL), axios.get(this.state.DepartmentsURL)])
		.then(axios.spread(function (meetings, departments) {
			this.setState({data: meetings.data,departments: departments.data});
		}.bind(this)));                
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

export default Meetings;
