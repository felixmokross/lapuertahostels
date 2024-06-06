#!/bin/sh

. .env
mongorestore --uri $RESTORE_DATABASE_URI  --nsExclude payload.users --nsExclude payload.payload-preferences --drop .backup/payload