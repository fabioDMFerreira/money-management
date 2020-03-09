import { Tag } from 'models/Tag';
import { Wallet } from 'models/Wallet';
import React, { ChangeEvent, Component } from 'react';
import Button from 'reactstrap/lib/Button';
import Form from 'reactstrap/lib/Form';
import FormGroup from 'reactstrap/lib/FormGroup';
import Input from 'reactstrap/lib/Input';
import Label from 'reactstrap/lib/Label';
import Modal from 'reactstrap/lib/Modal';
import ModalBody from 'reactstrap/lib/ModalBody';
import ModalFooter from 'reactstrap/lib/ModalFooter';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import TagSelect from 'views/containers/TagSelect/TagSelect';
import WalletSelect from 'views/containers/WalletSelect/WalletSelect';


type Props = {
  opened: boolean | undefined;
  close: () => void;
  save: (update: any) => void;
  tags: Tag[];
  createTag: any;
  wallets: Wallet[];
  createWallet: any;
}

type UpdateType = {
  tags?: any;
  description?: string;
  wallet?: string;
}

type State = {
  update: UpdateType;
}

export default class BulkUpdateModal extends Component<Props, State> {
  state = {
    update: {} as UpdateType,
  }

  change = (key: keyof UpdateType, value: any) => {
    if (!value || !value.length) {
      const update = { ...this.state.update };

      delete update[key];

      this.setState({
        update,
      });
      return;
    }

    this.setState({
      update: {
        ...this.state.update,
        [key]: value,
      },
    });
  }

  render() {
    const {
      opened,
      close,
      save,
      createTag,
      tags,
      wallets,
      createWallet,
    } = this.props;

    const {
      update,
    } = this.state;

    return (
      <Modal isOpen={opened} toggle={close}>
        <ModalHeader toggle={close} > Bulk update</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Description</Label>
              <Input
                type="text"
                value={update.description ? update.description : ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => { this.change('description', e.target.value); }}
              />
            </FormGroup>
            <FormGroup>
              <Label>Tags</Label>
              <TagSelect
                tags={tags}
                createTag={createTag}
                onChange={(value: any) => this.change('tags', value)}
                tagsSelected={update.tags ? update.tags : []}
              />
              {/* <Select
                options={tags}
                onChange={(value: any) => this.change('tags', value.value)}
                value={update.tags ? update.tags : []}
                onCreateOption={(newOptionLabel: string) => {
                  const newOption = { label: newOptionLabel }
                  createTag(newOption);
                  if (update.tags) {
                    this.change('tags', [...update.tags, newOption])
                  }
                  else {
                    this.change('tags', [newOption]);
                  }
                }}
                isMulti
              /> */}
            </FormGroup>
            <FormGroup>
              <Label>Wallet</Label>
              <WalletSelect
                wallets={wallets}
                createWallet={createWallet}
                onChange={(value: any) => {
                  this.change('wallet', value.value);
                }}
                walletSelected={update.wallet ? update.wallet : ''}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => save(this.state.update)}>Bulk update</Button>{' '}
          <Button color="secondary" onClick={close}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

