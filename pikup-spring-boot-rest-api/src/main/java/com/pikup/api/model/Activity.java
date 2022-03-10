package com.pikup.api.model;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * The type Activity.
 *
 * @author Benjamin Szabo
 */
@Entity
@Table(name = "activity")
@EntityListeners(AuditingEntityListener.class)
public class Activity {

    @Id
    private long id;
    @Column(name = "created_by", nullable = false)
    private String createdBy;

    @Column(name = "activity_name", nullable = false)
    private String activityName;

    @Column(name = "member_count", nullable = false)
    private int memberCount;

    @Column(name = "create_time")
    private Date createTime;

    @Column(name = "date_time", nullable = false)
    private String dateTime;

    @Column(name = "activity_street", nullable = false)
    private String activityStreet;

    @Column(name = "activity_city", nullable = false)
    private String activityCity;

    @Column(name = "activity_state", nullable = false)
    private String activityState;

    @Column(name = "activity_zip", nullable = false)
    private String activityZip;

    @Column(name = "activity_description", nullable = false)
    private String activityDescription;

    @ManyToMany
    @JoinTable(
            name="users_joined",
            joinColumns = @JoinColumn(name = "activity_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> joinedUsers = new HashSet<>();

    /**
     * Gets id.
     *
     * @return the id
     */
    public long getId() {
        return id;
    }

    /**
     * Sets id.
     *
     * @param id the id
     */
    public void setId(long id) {
        this.id = id;
    }

    /**
     * Gets first name.
     *
     * @return the first name
     */
    public String getActivityName() {
        return activityName;
    }

    /**
     * Sets first name.
     *
     * @param activityName the first name
     */
    public void setActivityName(String activityName) {
        this.activityName = activityName;
    }

    /**
     * Gets memberCount.
     *
     * @return the memberCount
     */
    public int getMemberCount() {
        return memberCount;
    }

    /**
     * Sets memberCount.
     *
     * @param memberCount the memberCount
     */
    public void setMemberCount(int memberCount) {
        this.memberCount = memberCount;
    }

    /**
     * Gets createTime.
     *
     * @return the createTime
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * Sets createTime.
     *
     * @param createTime the createTime
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    /**
     * Gets dateTime.
     *
     * @return the dateTime
     */
    public String getDateTime() {
        return dateTime;
    }

    /**
     * Sets dateTime.
     *
     * @param role the dateTime
     */
    public void setDateTime(String role) {
        this.dateTime = role;
    }

    /**
     * Gets createdBy.
     *
     * @return the createdBy
     */
    public String getCreatedBy() {
        return createdBy;
    }

    /**
     * Sets createdBy.
     *
     * @param createdBy the createdBy
     */
    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    /**
     * Gets activityStreet.
     *
     * @return the activityStreet
     */
    public String getActivityStreet() {return activityStreet;}
    /**
     * Sets activityStreet.
     *
     * @param activityStreet the activityStreet
     */
    public void setActivityStreet(String activityStreet) {
        this.activityStreet = activityStreet;
    }

    /**
     * Gets activityCity.
     *
     * @return the activityCity
     */
    public String getActivityCity() {return activityCity;}

    /**
     * Sets activityCity.
     *
     * @param activityCity the activityCity
     */
    public void setActivityCity(String activityCity) {this.activityCity = activityCity;}

    /**
     * Gets activityState.
     *
     * @return the activityState
     */
    public String getActivityState() {return activityState;}

    /**
     * Sets activityState.
     *
     * @param activityState the activityState
     */
    public void setActivityState(String activityState) {this.activityState = activityState;}

    /**
     * Gets activityZip.
     *
     * @return the activityZip
     */
    public String getActivityZip() {return activityZip;}

    /**
     * Sets activityZip.
     *
     * @param activityZip the activityZip
     */
    public void setActivityZip(String activityZip) {this.activityZip = activityZip;}

    /**
     * Gets activityDescription.
     *
     * @return the activityDescription
     */
    public String getActivityDescription() {return activityDescription;}

    /**
     * Sets activityDescription.
     *
     * @param activityDescription the activityDescription
     */
    public void setActivityDescription(String activityDescription) {this.activityDescription = activityDescription;}

    @Override
    public String toString() {
        return "Activity{" +
                "id=" + id +
                ", createdBy='" + createdBy + '\'' +
                ", activityName='" + activityName + '\'' +
                ", memberCount=" + memberCount +
                ", createTime=" + createTime +
                ", dateTime='" + dateTime + '\'' +
                ", activityStreet='" + activityStreet + '\'' +
                ", activityCity='" + activityCity + '\'' +
                ", activityState='" + activityState + '\'' +
                ", activityZip='" + activityZip + '\'' +
                ", activityDescription='" + activityDescription + '\'' +
                ", joinedUsers=" + joinedUsers +
                '}';
    }

    public Set<User> getJoinedUsers() {
        return joinedUsers;
    }

    public void joinUser(User user) {
        joinedUsers.add(user);
    }

    public void removeUser(User user) {
        joinedUsers.remove(user);
    }

}
