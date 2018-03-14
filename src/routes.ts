import * as Router from 'koa-router';
import config from 'config';

/*import your controllers*/
import root_get  from 'controllers/root_get';

const router = new Router();

router.prefix(config.api.prefix)

/*Your routes*/
router.get('/', root_get);

export const routes = router;