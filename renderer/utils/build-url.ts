import type { NextApiRequest } from 'next';
import LOLAlytics from '../lib/LA/LA.DataTypes/LA.Constants';

export default function buildURL(route: string, req: NextApiRequest): string {
  const data = Object.entries(req.query);
  let params = '?';

  if ('champion' in req.query)
    data.pop();

  data.forEach((element) => {
    params += params === '?' ? '' : '&';
    params += element[0].concat('=', element[1].toString());
  });

  return LOLAlytics.WebSiteUrl.concat(route).concat(params);
}
