package com.pikup.api.repository;

import com.pikup.api.model.Activity;
import com.pikup.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * The interface Activity repository.
 *
 * @author Benjamin Szabo
 */
@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {
    Activity findByActivityName(String activity);
}
