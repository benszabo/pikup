package com.pikup.api.model;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

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

    @Column(name = "activity_time", nullable = false)
    private String activityTime;

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
     * @param firstName the first name
     */
    public void setActivityName(String firstName) {
        this.activityName = firstName;
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
     * Gets created at.
     *
     * @return the created at
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * Sets created at.
     *
     * @param createdAt the created at
     */
    public void setCreateTime(Date createdAt) {
        this.createTime = createdAt;
    }

    /**
     * Gets role.
     *
     * @return the role
     */
    public String getActivityTime() {
        return activityTime;
    }

    /**
     * Sets role.
     *
     * @param role the role
     */
    public void setActivityTime(String role) {
        this.activityTime = role;
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

    @Override
    public String toString() {
        return "Group{" +
                "id=" + id +
                ", activityName='" + activityName + '\'' +
                ", memberCount='" + memberCount + '\'' +
                '}';
    }
}
