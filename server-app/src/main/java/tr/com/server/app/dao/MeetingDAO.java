package tr.com.server.app.dao;

import org.springframework.stereotype.Repository;

import tr.com.server.app.domain.Meeting;

/**
 * Meeting DAO.
 *
 * @author ÜMİT YILDIRIM ._.
 *
 */
@Repository("meetingDAO")
public class MeetingDAO extends AbstractDao<Integer, Meeting> {

    public Meeting findById(Integer id) {
        Meeting meeting = getByKey(id);
        return meeting;
    }

    public Boolean save(Meeting meeting) {
        Boolean result = persist(meeting);
        return result;
    }
}
