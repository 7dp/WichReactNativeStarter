import { Button, KeyboardAwareScrollView, TextInput } from '@/components'
import { t } from '@/i18n'
import { StackParams } from '@/navigator'
import { authActions } from '@/store/slices'
import { commonStyles } from '@/styles'
import { setFocus } from '@/utils'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { FC, useRef, useState } from 'react'
import { TextInput as RNTextInput } from 'react-native'
import { useDispatch } from 'react-redux'
import { style } from './style'

const LoginScreen: FC<NativeStackScreenProps<StackParams, 'Login'>> = ({
  navigation,
}) => {
  // #region Redux
  const dispatch = useDispatch()

  // #region Refs
  const passwordRef = useRef<RNTextInput>(null)

  // #region States
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // #region Functions
  const isDisabled = () => email.trim().length < 6 || password.trim().length < 8

  const login = () => {
    dispatch(authActions.login({ email, password }))
  }

  // #region Renders
  return (
    <KeyboardAwareScrollView
      scrollViewProps={{
        contentContainerStyle: style.root,
        style: commonStyles.flex,
      }}
    >
      <TextInput
        label={t('login.email')}
        inputProps={{
          autoCapitalize: 'none',
          keyboardType: 'email-address',
          onChangeText: setEmail,
          onSubmitEditing: () => setFocus(passwordRef),
          placeholder: t('login.placeholderEmail'),
          returnKeyType: 'next',
        }}
      />
      <TextInput
        ref={passwordRef}
        label={t('login.password')}
        inputProps={{
          autoCapitalize: 'none',
          onChangeText: setPassword,
          placeholder: t('login.placeholderPassword'),
          returnKeyType: 'done',
        }}
        containerProps={{
          style: style.passwordInput,
        }}
        isPassword
      />
      <Button
        text={t('login.login')}
        props={{ style: style.button, disabled: isDisabled(), onPress: login }}
      />
    </KeyboardAwareScrollView>
  )
}

export { LoginScreen }
