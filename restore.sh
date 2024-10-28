#!/bin/sh

. .env

# echo "Restoring database…"
mongorestore --uri $RESTORE_DATABASE_URI  --nsExclude payload.users --nsExclude payload.payload-preferences --drop .backup/payload

echo "Restoring S3 bucket…"
aws s3 sync ./.s3-backup $RESTORE_S3_BUCKET --delete

echo "Done"