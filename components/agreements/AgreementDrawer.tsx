import React from 'react';

import { Agreement } from '../../lib/graphql/types/v2/graphql';

import Drawer from '../Drawer';

import AgreementForm from './AgreementForm';
import { AgreementWithActions } from './AgreementWithActions';

type AgreementDrawerProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (Agreement) => void;
  onEdit: (Agreement) => void;
  onDelete: (Agreement) => void;
  agreement?: Agreement;
  hostLegacyId: number;
  onFilePreview: () => void;
};

export default function AgreementDrawer({
  open,
  onClose,
  onCreate,
  onEdit,
  onDelete,
  agreement,
  hostLegacyId,
  onFilePreview,
}: AgreementDrawerProps) {
  const [isEditing, setEditing] = React.useState<boolean>(false);

  const closeDrawer = React.useCallback(() => {
    setEditing(false);
    onClose();
  }, [onClose]);

  return (
    <Drawer maxWidth="512px" open={open} onClose={closeDrawer} showActionsContainer data-cy="agreement-drawer">
      {isEditing || !agreement ? (
        <AgreementForm
          hostLegacyId={hostLegacyId}
          agreement={agreement}
          onCreate={onCreate}
          onCancel={closeDrawer}
          onEdit={agreement => {
            onEdit?.(agreement);
            closeDrawer();
          }}
        />
      ) : (
        <AgreementWithActions
          agreement={agreement}
          onEdit={() => setEditing(true)}
          onDelete={onDelete}
          openFileViewer={onFilePreview}
        />
      )}
    </Drawer>
  );
}
