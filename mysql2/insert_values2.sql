-- Insert values into users
INSERT INTO videos
	(
		user_id,
		user_name,
		user_address,
		user_city,
		user_phone,
		process_status,
		date_created,
		user_relationship

	)
	VALUES
    (
		(1, "Alex", "321 Bedok Street 8", "Singapore", "(+65) 91243631"),
		(2, "Ben", "23 Lorong Drive 2", "Singapore", "(+65) 94257631")
	)
		
	ON CONFLICT (video_id) DO UPDATE
	SET
		video_name = excluded.video_name,
		video_status = excluded.video_status,
		date_created = excluded.date_created,
		predictions = excluded.predictions
;
