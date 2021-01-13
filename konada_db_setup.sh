#!/bin/bash
set -e

echo -e "Making DB: konada, user: konada_user, password: konada_pass with permission\n"

sudo -u postgres createdb konada
echo -e "Successfully created DB konada"

sudo -u postgres createuser konada_user
echo -e "Successfully created DB user konada_user"

sudo -u postgres psql -c "alter user konada_user with encrypted password 'konada_pass';"
echo -e "Successfully created konada_user password konada_pass"

sudo -u postgres psql -c "grant all privileges on database konada to konada_user"
echo -e "Successfully granted all permission on konada DB to konada_user"

echo "Completed"
