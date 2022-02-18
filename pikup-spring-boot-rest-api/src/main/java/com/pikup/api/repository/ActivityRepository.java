package com.pikup.api.repository;

import com.pikup.api.model.Activity;
import com.pikup.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * The interface Activity repository.
 *
 * @author Benjamin Szabo
 */
@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {

    List<Activity> findByActivityName(String activity);

    List<Activity> findActivityByMemberCount(int activity);

    List<Activity> findByDateTime(String activity);
}
