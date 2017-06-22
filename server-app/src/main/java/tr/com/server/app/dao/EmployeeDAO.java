package tr.com.server.app.dao;

import org.springframework.stereotype.Repository;

import tr.com.server.app.domain.Employee;

/**
 * Employee DAO.
 *
 * @author ÜMİT YILDIRIM ._.
 *
 */
@Repository("employeeDAO")
public class EmployeeDAO extends AbstractDao<Integer, Employee> {

    public Employee findById(Integer id) {
        Employee employee = getByKey(id);
        return employee;
    }

    public Boolean save(Employee employee) {
        Boolean result = persist(employee);
        return result;
    }
}
