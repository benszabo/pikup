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

    @ManyToMany
    @JoinTable(
            name="users_joined",
            joinColumns = @JoinColumn(name = "activity_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> joinedUsers = new HashSet<>();

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

    @Override
    public String toString() {
        return "Group{" +
                "id=" + id +
                ", activityName='" + activityName + '\'' +
                ", createdBy='" + createdBy + '\'' +
                ", memberCount='" + memberCount + '\'' +
                ", dateTime='" + dateTime + '\'' +
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
