package tr.com.server.app.domain;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.validator.constraints.NotEmpty;

/**
 * Meeting Entity.
 * 
 * @author ÜMİT YILDIRIM ._.
 *
 */
@Entity
@Table(name = "MEETING")
//@JsonIdentityInfo(
//		  generator = ObjectIdGenerators.PropertyGenerator.class, 
//		  property = "id", scope = Meeting.class)
public class Meeting implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name="MEETING_ID", unique = true, nullable = false)
	//@GeneratedValue(strategy = GenerationType.IDENTITY)		
	private Integer id;
	
	@NotEmpty
    @Column(name="NAME", nullable=false)
	private String name;
	
    @Column(name="DESCRIPTION")
	private String description;
    
//    @JsonManagedReference
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "DEPARTMENT_MEETING", joinColumns = { @JoinColumn(name = "MEETING_ID") }, inverseJoinColumns = { @JoinColumn(name = "DEPARTMENT_ID") })
    @Fetch (FetchMode.SELECT)
	private List<Department> departments;
	
    public Meeting() {}
    
	public Meeting(Integer id, String name, String description, List<Department> departments) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.departments = departments;
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

	public List<Department> getDepartments() {
		return departments;
	}

	public void setDepartments(List<Department> departments) {
		this.departments = departments;
	}
	
}