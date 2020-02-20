import React, { useState, useEffect, useMemo } from 'react';
import { Cropper } from '../FileUpload/FileCrop';
import { RecognitionCard } from './RecognitionCard';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import RecogModal from '../RecogModal/RecogModal';

export function Profile({ profile, isPeer }) {
	const [badges, setBadges] = useState([]);
	console.log(profile, 'profile');

	useEffect(() => {
		axiosWithAuth()
			.get('/badges')
			.then(res => {
				setBadges(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	const userBadges = useMemo(
		() =>
			profile.rec.reduce((acc, rec) => {
				if (profile.id === rec.sender) {
					return acc;
				} else if (rec.badge_id && acc[rec.badge_id]) {
					acc[rec.badge_id].count++;
				} else if (badges.length && rec.badge_id) {
					acc[rec.badge_id] = {
						badge: badges[rec.badge_id - 1].badge_URL,
						count: 1,
					};
				}
				return acc;
			}, {}),
		[profile, badges],
	);

	console.log(userBadges);

	return (
		//This may need to be refactored in a future build if things are added in order to make it more mobile-friendly
		<div className="container-entire-profile">
			{/* This is the profile card with the image on the top lefthand side, profile picture and "username" are coming from Auth0*/}
			<div className="container-profile-card-and-badges">
				<div className="container-profile-card">
					<div className="profile-info">
						<div className="profile-image">
							<img
								className="profilepic"
								src={profile.profile_picture}
								alt="user profile"
							/>
							{/* THIS IMAGE OVERLAYS PROFILE PICTURE AND ALLOWS USER TO CHANGE PROFILE PIC, Commented out for now{!isPeer && (
							<div>
								<Cropper />
							</div>
						)} */}
						</div>
						<h5>
							{profile.first_name} {profile.last_name}
						</h5>
						<p>{profile.job_title}</p>
						<p>{profile.department}</p>
					</div>
				</div>
				{/* This is the badges card at the bottom of the lefthand side, and is currently hardcoded with badge pictures */}
				<div className="container-badges">
					<h5>Badges</h5>
					<div>
						{badges && (
							<>
								{Object.keys(userBadges).map(id => {
									if (userBadges[id].count === 1) {
										return (
											<div>
												<img
													src={userBadges[id].badge}
												/>
											</div>
										);
									} else {
										return (
											<div>
												<div
													badgeContent={
														'x' +
														userBadges[id].count
													}
													overlap="circle">
													<img
														src={
															userBadges[id].badge
														}
													/>
												</div>
											</div>
										);
									}
								})}
							</>
						)}
					</div>
				</div>
			</div>
			{/* This is the activity container on the righthand side and is currently hardcoded with rewards entries */}
			<div className="activity-card">
				<h5>Activity</h5>
				<div className="title-activity-card">
					{profile &&
						profile.rec
							.sort(function(a, b) {
								return new Date(b.date) - new Date(a.date);
							})
							.map(recognition => (
								<RecognitionCard
									key={recognition.id}
									sent={profile.id === recognition.sender}
									badge={badges[recognition.badge_id - 1]}
									profile={profile}
									recognition={recognition}
								/>
							))}
				</div>
			</div>
		</div>
	);
}
