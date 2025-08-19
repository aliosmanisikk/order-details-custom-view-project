import { useIntl } from 'react-intl';
import { useCustomViewContext } from '@commercetools-frontend/application-shell-connectors';
import Constraints from '@commercetools-uikit/constraints';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import { ContentNotification } from '@commercetools-uikit/notifications';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { useOrderDetailsFetcher } from '../../hooks/use-order-details-connector';
import { getErrorMessage } from '../../helpers';
import messages from './messages';
import Grid from '@commercetools-uikit/grid';

const Order = () => {
  const intl = useIntl();
  const { user, hostUrl } = useCustomViewContext(
    (context) => {
        console.log(context)
        return {
          user: context.user,
          dataLocale: context.dataLocale,
          projectLanguages: context.project?.languages,
          hostUrl: context.hostUrl,
        }
      }
  );

  let orderId: string | null = null;
  const match = hostUrl.match(/\/orders\/([^/]+)/);
  if (match) {
    orderId = match[1];
  }


  const { result, error, loading } = useOrderDetailsFetcher(orderId || "");


  if (error) {
    return (
      <ContentNotification type="error">
        <Text.Body>{getErrorMessage(error)}</Text.Body>
      </ContentNotification>
    );
  }

  if (!loading && !result) {
    return (
      <ContentNotification type="info">
        <Text.Body intlMessage={messages.noResults} />
      </ContentNotification>
    );
  }

  return (
    <Spacings.Stack scale="xl">
      {loading && <LoadingSpinner />}

      {result ? (
        <Spacings.Stack scale="l">
          
            <Grid
              gridGap="16px"
              gridAutoColumns="1fr"
              gridTemplateColumns="repeat(2, 1fr)"
            >
              <iframe  width="600" height="2240" src={`https://io-whitelabel-cxro-2893.grandvision.io/order/confirm?orderData=${result.orderNumber}`} title="Order details"></iframe>
            </Grid>

        </Spacings.Stack>
      ) : null}
    </Spacings.Stack>
  );
};
Order.displayName = 'Order Details';

export default Order;
