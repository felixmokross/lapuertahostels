#!/bin/sh

. .env
mongorestore --uri $RESTORE_DATABASE_URI --drop .backup/payload