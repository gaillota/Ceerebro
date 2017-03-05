import {Credentials} from '../../api/credentials/credentials';

export const SearchEngine = {
    findCredentialsBy(search) {
        let query = {
            ownerId: Meteor.userId()
        };

        if (search) {
            query["$or"] = [
                {
                    domain: new RegExp(search)
                },
                {
                    identifier: new RegExp(search)
                }
            ];
        }

        return Credentials.find(query, {
            sort: {
                domain: 1
            }
        });
    }
}
