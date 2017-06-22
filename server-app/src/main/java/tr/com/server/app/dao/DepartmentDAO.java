package tr.com.server.app.dao;

import org.springframework.stereotype.Repository;

import tr.com.server.app.domain.Department;

/**
 * Department DAO.
 *
 * @author ÜMİT YILDIRIM ._.
 *
 */
@Repository("departmentDAO")
public class DepartmentDAO extends AbstractDao<Integer, Department> {

    public Department findById(Integer id) {
        Department department = getByKey(id);
        return department;
    }

    public Boolean save(Department department) {
        Boolean result = persist(department);
        return result;
    }
}
