package com.pikup.api.controller;

import com.pikup.api.exception.ResourceNotFoundException;
import com.pikup.api.model.Activity;
import com.pikup.api.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * The type Activity controller.
 *
 * @author Benjamin Szabo
 */
@RestController
@RequestMapping("/activity/v1")
public class ActivityController {

    @Autowired
    private ActivityRepository activityRepository;

    /**
     * Get all activities list.
     *
     * @return the list
     */
    @RequestMapping(value = "/activities", method = RequestMethod.GET)
    public List<Activity> getAllActivities() {
        return activityRepository.findAll();
    }

    /**
     * Gets Activity by name.
     *
     * @param name the Activity name
     * @return the Activity by name
     */
    @RequestMapping(value = "/activities/findbyname/{name}", method = RequestMethod.GET)
    public ResponseEntity<List<Activity>> getActivityByName(@PathVariable(value = "name") String name)
            throws ResourceNotFoundException {
        List<Activity> activities = activityRepository.findByActivityName(name);
        if(activities == null)
            throw new ResourceNotFoundException("Activity not found");
        return ResponseEntity.ok().body(activities);
    }

    /**
     * Gets Activity by member count.
     *
     * @param memberCount the Activity memberCount
     * @return the Activity by memberCount
     */
    @RequestMapping(value = "/activities/findbymembercount/{memberCount}", method = RequestMethod.GET)
    public ResponseEntity<List<Activity>> getActivityByMemberCount(@PathVariable(value = "memberCount") int memberCount)
            throws ResourceNotFoundException {
        List<Activity> activities = activityRepository.findActivityByMemberCount(memberCount);
        if(activities == null)
            throw new ResourceNotFoundException("No activities found");
        return ResponseEntity.ok().body(activities);
    }

    /**
     * Gets Activity by dateTime.
     *
     * @param dateTime the Activity dateTime
     * @return the Activity by dateTime
     * format: YYYY-MM-DD-HHMM
     */
    @RequestMapping(value = "/activities/findbydatetime/{dateTime}", method = RequestMethod.GET)
    public ResponseEntity<List<Activity>> getActivityByTime(@PathVariable(value = "dateTime") String dateTime)
            throws ResourceNotFoundException {
        List<Activity> activities = activityRepository.findByDateTime(dateTime);
        if(activities == null)
            throw new ResourceNotFoundException("No activities found");
        return ResponseEntity.ok().body(activities);
    }

    /**
     * Gets activity by id.
     *
     * @param activityId the activity id
     * @return the activity by id
     * @throws ResourceNotFoundException the resource not found exception
     */
    @RequestMapping(value = "/activities/{id}", method = RequestMethod.GET)
    public ResponseEntity<Activity> getActivityById(@PathVariable(value = "id") Long activityId)
            throws ResourceNotFoundException {
        Activity activity =
                activityRepository
                        .findById(activityId)
                        .orElseThrow(() -> new ResourceNotFoundException("Activity not found"));
        return ResponseEntity.ok().body(activity);
    }

    /**
     * Create activity.
     *
     * @param activity the Activity
     * @return the Activity
     */
    @RequestMapping(value = "/activities", method = RequestMethod.POST)
    public Map<String, Boolean> createActivity(@Validated @RequestBody Activity activity) {
        activity.setCreateTime(new Date());
        activityRepository.save(activity);
        Map<String, Boolean> response = new HashMap<>();
        response.put("created", Boolean.TRUE);
        return response;
    }

    /**
     * Update Activity response entity.
     *
     * @param activityId the Activity id
     * @param activityDetails the Activity details
     * @return the response entity
     * @throws ResourceNotFoundException the resource not found exception
     */
    @RequestMapping(value = "/activities/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Activity> updateActivity(
            @PathVariable(value = "id") Long activityId, @Validated @RequestBody Activity activityDetails)
            throws ResourceNotFoundException {

        Activity activity =
                activityRepository
                        .findById(activityId)
                        .orElseThrow(() -> new ResourceNotFoundException("Activity not found"));

        activity.setActivityName(activityDetails.getActivityName());
        activity.setDateTime(activityDetails.getDateTime());
        activity.setMemberCount(activityDetails.getMemberCount());

        final Activity updatedActivity = activityRepository.save(activity);
        return ResponseEntity.ok(updatedActivity);
    }

    /**
     * Delete activity map.
     *
     * @param activityId the activity id
     * @return the map
     * @throws Exception the exception
     */
    @RequestMapping(value = "/activities/{id}", method = RequestMethod.DELETE)
    public Map<String, Boolean> deleteActivity(@PathVariable(value = "id") Long activityId) throws Exception {
        Activity activity =
                activityRepository
                        .findById(activityId)
                        .orElseThrow(() -> new ResourceNotFoundException("Activity not found"));

        activityRepository.delete(activity);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
