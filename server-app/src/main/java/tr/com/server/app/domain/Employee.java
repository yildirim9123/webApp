package tr.com.server.app.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotEmpty;

/**
 * Employee Entity.
 * 
 * @author ÜMİT YILDIRIM ._.
 *
 */
@Entity
@Table(name = "EMPLOYEE")
//@JsonIdentityInfo(
//		  generator = ObjectIdGenerators.PropertyGenerator.class, 
//		  property = "id", scope = Employee.class)
public class Employee implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="EMPLOYEE_ID", unique = true, nullable = false)
	//@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@NotEmpty
    @Column(name="NAME", nullable=false)
    private String name;
	
	@NotEmpty
    @Column(name="SURNAME", nullable=false)
    private String surname;
	
	@NotNull
    @Column(name="SALARY", nullable=false)
    private Integer salary;
	
    @Column(name="DEPARTMENT_ID")
	private Integer departmentId;
	
    /*
    @JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "DEPARTMENT_ID", referencedColumnName = "DEPARTMENT_ID")
	private Department department;
    */
    
    public Employee() {}
    
	public Employee(Integer id, String name, String surname, Integer salary, Integer departmentId) {
		super();
		this.id = id;
		this.name = name;
		this.surname = surname;
		this.salary = salary;
		this.departmentId = departmentId;
	}



	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public Integer getSalary() {
		return salary;
	}

	public void setSalary(Integer salary) {
		this.salary = salary;
	}

	public Integer getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}

//	public Department getDepartment() {
//		return department;
//	}
//
//	public void setDepartment(Department department) {
//		this.department = department;
//	}	
}