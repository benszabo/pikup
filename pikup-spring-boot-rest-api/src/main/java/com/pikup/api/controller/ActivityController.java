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
    @RequestMapping(value = "/activities/find/{activity}", method = RequestMethod.GET)
    public ResponseEntity<Activity> getActivityByName(@PathVariable(value = "activity") String name) {
        Activity activity = activityRepository.findByActivityName(name);
        return ResponseEntity.ok().body(activity);
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
                        .orElseThrow(() -> new ResourceNotFoundException("User not found on :: " + activityId));
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
                        .orElseThrow(() -> new ResourceNotFoundException("Activity not found on :: " + activityId));

        activity.setActivityName(activityDetails.getActivityName());
        activity.setActivityTime(activityDetails.getActivityTime());
        activity.setMemberCount(activityDetails.getMemberCount());

        final Activity updatedActivity = activityRepository.save(activity);
        return ResponseEntity.ok(updatedActivity);
    }

    /**
     * Delete user map.
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
                        .orElseThrow(() -> new ResourceNotFoundException("Activity not found on :: " + activityId));

        activityRepository.delete(activity);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
