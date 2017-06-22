package tr.com.server.app.domain;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.validator.constraints.NotEmpty;

/**
 * Department Entity.
 * 
 * @author ÜMİT YILDIRIM ._.
 *
 */
@Entity
@Table(name = "DEPARTMENT")
//@JsonIdentityInfo(
//		  generator = ObjectIdGenerators.PropertyGenerator.class, 
//		  property = "id", scope = Department.class)
public class Department implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name="DEPARTMENT_ID", unique = true, nullable = false)
	//@GeneratedValue(strategy = GenerationType.IDENTITY)	
	private Integer id;
	
	@NotEmpty
    @Column(name="NAME", nullable=false)
	private String name;
	
    @Column(name="DESCRIPTION")
	private String description;
	
    @OneToMany(/*cascade=CascadeType.ALL, */mappedBy = "departmentId", fetch = FetchType.EAGER)
//    @Fetch(value = FetchMode.SUBSELECT)
    @Fetch(value = FetchMode.SELECT)    
	private List<Employee> employees;
	
//    @JsonBackReference
//    @ManyToMany(/*cascade=CascadeType.ALL, */fetch = FetchType.LAZY)
//    @Fetch(value = FetchMode.SUBSELECT)
//    @JoinTable(name = "DEPARTMENT_MEETING", joinColumns = { @JoinColumn(name = "DEPARTMENT_ID") }, inverseJoinColumns = { @JoinColumn(name = "MEETING_ID") })    
//	private List<Meeting> meetings;	

    public Department() {}
    
	public Department(Integer id, String name, String description) {
		this.id = id;
		this.name = name;
		this.description = description;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<Employee> getEmployees() {
		return employees;
	}

	public void setEmployees(List<Employee> employees) {
		this.employees = employees;
	}
	
//	public List<Meeting> getMeetings() {
//		return meetings;
//	}
//
//	public void setMeetings(List<Meeting> meetings) {
//		this.meetings = meetings;
//	}
}