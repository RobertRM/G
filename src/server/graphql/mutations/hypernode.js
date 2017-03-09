import {
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLID,
} from 'graphql';

import hypernodeInputType from '../types/hypernode-input';
import hypernodeType from '../types/hypernode';
import HypernodeModel from '../../models/node';

export default {
  addHypernode: {
    type: GraphQLBoolean,
    args: {},
    async resolve(root, params, context, options) {
      const hypernodeModel = new HypernodeModel();
      const newHypernode = await hypernodeModel.save();

      if (!newHypernode) {
        throw new Error('Error adding new node');
      }
      return true;
    }
  },
  deleteHypernode: {
    type: hypernodeType,
    args: {
      _id: {
        name: '_id',
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    async resolve(root, params, context, options) {
      const deletedHypernode = await HypernodeModel
        .findByIdAndRemove(params._id)
        .exec();

      if (!deletedHypernode) {
        throw new Error('Error deleting hypernode');
      }

      return deletedHypernode;
    }
  },
};
